import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.khuda.co.kr";
const SITE_NAME = "KHUDA";
const DEFAULT_IMAGE = `${SITE_URL}/images/logos/khuda-og.png`;
const DEFAULT_DESCRIPTION =
  "KHUDA는 인공지능과 데이터 분석을 기반으로 실전 프로젝트와 협업을 통해 성장하는 경희대학교 데이터·AI 학술 동아리입니다.";

interface SEOProps {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
}

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  image = DEFAULT_IMAGE,
  noindex = false,
  jsonLd,
}: SEOProps) => {
  const canonicalUrl = `${SITE_URL}${path}`;
  const robots = noindex ? "noindex, nofollow" : "index, follow";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="ko_KR" />

      {/* JSON-LD 구조화 데이터 */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
