import { Globe } from "lucide-react";
import { useApp } from "../context/AppContext";

export const LanguageToggle = () => {
  const { headingLang, toggleHeadingLang } = useApp();

  return (
    <button
      onClick={toggleHeadingLang}
      className="btn btn-outline btn-sm"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
        borderRadius: "9999px",
        padding: "0.38rem 0.8rem",
        fontWeight: 700,
        fontSize: "0.8rem",
        background: headingLang === "ta" ? "var(--primary-100)" : "var(--bg-card)",
        color: headingLang === "ta" ? "var(--primary-800)" : "var(--text-main)",
        borderColor: headingLang === "ta" ? "var(--primary-500)" : "var(--border-color)",
        transition: "all 0.2s ease"
      }}
      title="Toggle Headings Language (English / தமிழ்)"
    >
      <Globe size={15} color={headingLang === "ta" ? "var(--primary-600)" : "currentColor"} />
      <span>{headingLang === "ta" ? "தமிழ் (Headings)" : "English (Headings)"}</span>
    </button>
  );
};

