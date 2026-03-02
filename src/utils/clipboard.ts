/**
 * 텍스트를 클립보드에 복사
 * @returns 복사 성공 여부
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (!text || typeof text !== "string") {
    return false;
  }

  if (!navigator.clipboard || !navigator.clipboard.writeText) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    textArea.setAttribute("readonly", "");
    textArea.style.opacity = "0";

    try {
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      return successful;
    } catch (err) {
      console.warn("클립보드 복사에 실패했습니다:", err);
      return false;
    } finally {
      if (document.body.contains(textArea)) {
        document.body.removeChild(textArea);
      }
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.warn("클립보드 복사에 실패했습니다:", err);
    return false;
  }
};
