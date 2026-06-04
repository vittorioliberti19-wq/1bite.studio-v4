import { ImageResponse } from "next/og";

export const alt = "1bite — Concebimos experiencias indelebles";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "90px",
        background: "#000",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <span style={{ fontSize: 180, fontWeight: 800, letterSpacing: -4 }}>
          1bite
        </span>
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: 28,
            marginLeft: 10,
            background:
              "linear-gradient(90deg,#08E1F4,#086BFC,#AC31FB,#ED2E97,#FD6648)",
          }}
        />
      </div>
      <div style={{ fontSize: 46, fontWeight: 600, marginTop: 24 }}>
        Concebimos experiencias indelebles
      </div>
      <div style={{ fontSize: 30, color: "#9aa6ad", marginTop: 28 }}>
        Branding · Social · Web · Apps · Sistemas · Audiovisual — Maracaibo
      </div>
      <div
        style={{
          height: 12,
          width: 360,
          marginTop: 48,
          borderRadius: 12,
          background:
            "linear-gradient(90deg,#08E1F4,#086BFC,#AC31FB,#ED2E97,#FD6648)",
        }}
      />
    </div>,
    { ...size },
  );
}
