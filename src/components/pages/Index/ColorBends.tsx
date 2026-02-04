import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';
import './ColorBends.css';

const MAX_COLORS = 8;

// 상수 정의
const CLEAR_COLOR = 0x000000;
const DEFAULT_PIXEL_RATIO = 1;
const MAX_PIXEL_RATIO = 2;
const FULL_ROTATION = 360;
const DEGREES_TO_RADIANS = Math.PI / 180;
const RGB_MAX = 255;
const HEX_BASE = 16;
const POINTER_SMOOTH_FACTOR = 8;
const LERP_MAX = 1;
const CONTAINER_FALLBACK = 1;
const POINTER_COORD_MULTIPLIER = 2;
const POINTER_COORD_OFFSET = 1;

// Three.js 설정 상수
const THREE_CONFIG = {
  camera: {
    left: -1,
    right: 1,
    top: 1,
    bottom: -1,
    near: 0,
    far: 1,
  },
  geometry: {
    width: 2,
    height: 2,
  },
  initialVectors: {
    canvas: { x: 1, y: 1 },
    rotation: { x: 1, y: 0 },
    pointer: { x: 0, y: 0 },
    color: { x: 0, y: 0, z: 0 },
  },
} as const;

// Renderer DOM 스타일 상수
const RENDERER_DOM_STYLES = {
  width: '100%',
  height: '100%',
  display: 'block',
} as const;

// Renderer 설정 상수
const RENDERER_CONFIG = {
  antialias: false,
  powerPreference: 'high-performance' as WebGLPowerPreference,
  alpha: true,
} as const;

// Material 설정 상수
const MATERIAL_CONFIG = {
  premultipliedAlpha: true,
  transparent: true,
} as const;

const frag = `
#define MAX_COLORS ${MAX_COLORS}

uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;

varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

    vec3 col = vec3(0.0);
    float a = 1.0;
    if (uColorCount > 0) {
      vec2 s = q;
      vec3 sumCol = vec3(0.0);
      float cover = 0.0;
      for (int i = 0; i < MAX_COLORS; ++i) {
            if (i >= uColorCount) break;
            s -= 0.01;
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);
            float kMix = pow(kBelow, 0.3);
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
            vec2 disp = (r - s) * kBelow;
            vec2 warped = s + disp * gain;
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
            float m = mix(m0, m1, kMix);
            float w = 1.0 - exp(-6.0 / exp(6.0 * m));
            sumCol += uColors[i] * w;
            cover = max(cover, w);
      }
      col = clamp(sumCol, 0.0, 1.0);
      a = uTransparent > 0 ? cover : 1.0;
    } else {
        vec2 s = q;
        for (int k = 0; k < 3; ++k) {
            s -= 0.01;
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);
            float kMix = pow(kBelow, 0.3);
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
            vec2 disp = (r - s) * kBelow;
            vec2 warped = s + disp * gain;
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);
            float m = mix(m0, m1, kMix);
            col[k] = 1.0 - exp(-6.0 / exp(6.0 * m));
        }
        a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;
    }

    if (uNoise > 0.0001) {
      float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
      col += (n - 0.5) * uNoise;
      col = clamp(col, 0.0, 1.0);
    }

    vec3 rgb = (uTransparent > 0) ? col * a : col;
    gl_FragColor = vec4(rgb, a);
}
`;

const vert = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

interface ColorBendsProps {
  className?: string;
  style?: React.CSSProperties;
  rotation?: number;
  speed?: number;
  colors?: string[];
  transparent?: boolean;
  autoRotate?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  parallax?: number;
  noise?: number;
}

export default function ColorBends({
  className,
  style,
  rotation = 45,
  speed = 0.2,
  colors = [],
  transparent = true,
  autoRotate = 0,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 1,
  parallax = 0.5,
  noise = 0.1
}: ColorBendsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rafRef = useRef<number | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const rotationRef = useRef(rotation);
  const autoRotateRef = useRef(autoRotate);
  const pointerTargetRef = useRef(new THREE.Vector2(THREE_CONFIG.initialVectors.pointer.x, THREE_CONFIG.initialVectors.pointer.y));
  const pointerCurrentRef = useRef(new THREE.Vector2(THREE_CONFIG.initialVectors.pointer.x, THREE_CONFIG.initialVectors.pointer.y));
  const pointerSmoothRef = useRef(POINTER_SMOOTH_FACTOR);

  // Transparent 값을 숫자로 변환하는 헬퍼 함수
  const transparentToNumber = (isTransparent: boolean): number => {
    return isTransparent ? 1 : 0;
  };

  // Renderer clear color 설정 헬퍼 함수
  const setRendererClearColor = (renderer: THREE.WebGLRenderer, isTransparent: boolean) => {
    renderer.setClearColor(CLEAR_COLOR, isTransparent ? 0 : 1);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      THREE_CONFIG.camera.left,
      THREE_CONFIG.camera.right,
      THREE_CONFIG.camera.top,
      THREE_CONFIG.camera.bottom,
      THREE_CONFIG.camera.near,
      THREE_CONFIG.camera.far
    );
    const geometry = new THREE.PlaneGeometry(THREE_CONFIG.geometry.width, THREE_CONFIG.geometry.height);
    const uColorsArray = Array.from({ length: MAX_COLORS }, () => 
      new THREE.Vector3(
        THREE_CONFIG.initialVectors.color.x,
        THREE_CONFIG.initialVectors.color.y,
        THREE_CONFIG.initialVectors.color.z
      )
    );

    const material = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        uCanvas: { value: new THREE.Vector2(THREE_CONFIG.initialVectors.canvas.x, THREE_CONFIG.initialVectors.canvas.y) },
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uRot: { value: new THREE.Vector2(THREE_CONFIG.initialVectors.rotation.x, THREE_CONFIG.initialVectors.rotation.y) },
        uColorCount: { value: 0 },
        uColors: { value: uColorsArray },
        uTransparent: { value: transparentToNumber(transparent) },
        uScale: { value: scale },
        uFrequency: { value: frequency },
        uWarpStrength: { value: warpStrength },
        uPointer: { value: new THREE.Vector2(THREE_CONFIG.initialVectors.pointer.x, THREE_CONFIG.initialVectors.pointer.y) },
        uMouseInfluence: { value: mouseInfluence },
        uParallax: { value: parallax },
        uNoise: { value: noise }
      },
      premultipliedAlpha: MATERIAL_CONFIG.premultipliedAlpha,
      transparent: MATERIAL_CONFIG.transparent
    });

    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({
      antialias: RENDERER_CONFIG.antialias,
      powerPreference: RENDERER_CONFIG.powerPreference,
      alpha: RENDERER_CONFIG.alpha
    });

    rendererRef.current = renderer;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || DEFAULT_PIXEL_RATIO, MAX_PIXEL_RATIO));
    setRendererClearColor(renderer, transparent);
    renderer.domElement.style.width = RENDERER_DOM_STYLES.width;
    renderer.domElement.style.height = RENDERER_DOM_STYLES.height;
    renderer.domElement.style.display = RENDERER_DOM_STYLES.display;

    container.appendChild(renderer.domElement);

    const clock = new THREE.Clock();

    const handleResize = () => {
      const w = container.clientWidth || CONTAINER_FALLBACK;
      const h = container.clientHeight || CONTAINER_FALLBACK;
      renderer.setSize(w, h, false);
      material.uniforms.uCanvas.value.set(w, h);
    };

    handleResize();

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(handleResize);
      ro.observe(container);
      resizeObserverRef.current = ro;
    } else {
      window.addEventListener('resize', handleResize);
    }

    const loop = () => {
      const dt = clock.getDelta();
      const elapsed = clock.elapsedTime;

      material.uniforms.uTime.value = elapsed;

      const deg = (rotationRef.current % FULL_ROTATION) + autoRotateRef.current * elapsed;
      const rad = deg * DEGREES_TO_RADIANS;
      const c = Math.cos(rad);
      const s = Math.sin(rad);
      material.uniforms.uRot.value.set(c, s);

      const cur = pointerCurrentRef.current;
      const tgt = pointerTargetRef.current;
      const amt = Math.min(LERP_MAX, dt * pointerSmoothRef.current);
      cur.lerp(tgt, amt);
      material.uniforms.uPointer.value.copy(cur);

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
      else window.removeEventListener('resize', handleResize);

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [frequency, mouseInfluence, noise, parallax, scale, speed, transparent, warpStrength]);

  useEffect(() => {
    const material = materialRef.current;
    const renderer = rendererRef.current;
    if (!material) return;

    rotationRef.current = rotation;
    autoRotateRef.current = autoRotate;
    material.uniforms.uSpeed.value = speed;
    material.uniforms.uScale.value = scale;
    material.uniforms.uFrequency.value = frequency;
    material.uniforms.uWarpStrength.value = warpStrength;
    material.uniforms.uMouseInfluence.value = mouseInfluence;
    material.uniforms.uParallax.value = parallax;
    material.uniforms.uNoise.value = noise;

    const toVec3 = (hex: string) => {
      const h = hex.replace('#', '').trim();
      const v =
        h.length === 3
          ? [parseInt(h[0] + h[0], HEX_BASE), parseInt(h[1] + h[1], HEX_BASE), parseInt(h[2] + h[2], HEX_BASE)]
          : [parseInt(h.slice(0, 2), HEX_BASE), parseInt(h.slice(2, 4), HEX_BASE), parseInt(h.slice(4, 6), HEX_BASE)];
      return new THREE.Vector3(v[0] / RGB_MAX, v[1] / RGB_MAX, v[2] / RGB_MAX);
    };

    const arr = (colors || []).filter(Boolean).slice(0, MAX_COLORS).map(toVec3);
    for (let i = 0; i < MAX_COLORS; i++) {
      const vec = material.uniforms.uColors.value[i];
      if (i < arr.length) vec.copy(arr[i]);
      else vec.set(
        THREE_CONFIG.initialVectors.color.x,
        THREE_CONFIG.initialVectors.color.y,
        THREE_CONFIG.initialVectors.color.z
      );
    }

    material.uniforms.uColorCount.value = arr.length;
    material.uniforms.uTransparent.value = transparentToNumber(transparent);
    if (renderer) setRendererClearColor(renderer, transparent);
  }, [
    rotation,
    autoRotate,
    speed,
    scale,
    frequency,
    warpStrength,
    mouseInfluence,
    parallax,
    noise,
    colors,
    transparent
  ]);

  useEffect(() => {
    const material = materialRef.current;
    const container = containerRef.current;
    if (!material || !container) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const width = rect.width || CONTAINER_FALLBACK;
      const height = rect.height || CONTAINER_FALLBACK;
      const x = ((e.clientX - rect.left) / width) * POINTER_COORD_MULTIPLIER - POINTER_COORD_OFFSET;
      const y = -(((e.clientY - rect.top) / height) * POINTER_COORD_MULTIPLIER - POINTER_COORD_OFFSET);
      pointerTargetRef.current.set(x, y);
    };

    container.addEventListener('pointermove', handlePointerMove);

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return <div ref={containerRef} className={cn('color-bends-container', className)} style={style} />;
}

