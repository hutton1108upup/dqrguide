type OgImageProps = {
  title: string;
  eyebrow: string;
  evidence: string;
};

export function OgImage({ title, eyebrow, evidence }: OgImageProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        backgroundColor: "#0B1020",
        color: "#F3F6FC",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px", color: "#F2C14E", fontSize: 24, fontWeight: 700, letterSpacing: "2px" }}>
        <span style={{ display: "flex", width: 28, height: 28, border: "3px solid #F2C14E", borderRadius: "50%" }} />
        DQR GUIDE
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "1000px" }}>
        <div style={{ color: "#68C8FF", fontSize: 22, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase" }}>{eyebrow}</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 58, lineHeight: 1.08, fontWeight: 700 }}>{title}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #293653", paddingTop: "18px", color: "#AAB6CC", fontSize: 20 }}>
        <span>{evidence}</span>
        <span style={{ color: "#F2C14E", fontWeight: 700 }}>dqr.gg</span>
      </div>
    </div>
  );
}
