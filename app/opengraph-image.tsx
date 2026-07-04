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
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        color: "#fff",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* blobs de la gama firma */}
      <div
        style={{
          position: "absolute",
          top: -220,
          left: -180,
          width: 620,
          height: 620,
          borderRadius: 620,
          background:
            "radial-gradient(circle, rgba(8,107,252,0.55) 0%, rgba(8,107,252,0) 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -260,
          right: -160,
          width: 680,
          height: 680,
          borderRadius: 680,
          background:
            "radial-gradient(circle, rgba(172,49,251,0.5) 0%, rgba(172,49,251,0) 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -180,
          right: -120,
          width: 460,
          height: 460,
          borderRadius: 460,
          background:
            "radial-gradient(circle, rgba(237,46,151,0.4) 0%, rgba(237,46,151,0) 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -160,
          left: -120,
          width: 420,
          height: 420,
          borderRadius: 420,
          background:
            "radial-gradient(circle, rgba(8,225,244,0.35) 0%, rgba(8,225,244,0) 70%)",
        }}
      />

      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <span style={{ fontSize: 190, fontWeight: 800, letterSpacing: -6 }}>
          1bite
        </span>
        <span
          style={{
            width: 34,
            height: 34,
            borderRadius: 34,
            marginTop: 52,
            marginLeft: 12,
            background:
              "linear-gradient(135deg,#08E1F4,#086BFC,#AC31FB,#ED2E97)",
          }}
        />
      </div>
      <div
        style={{
          height: 10,
          width: 460,
          borderRadius: 10,
          marginTop: 4,
          background:
            "linear-gradient(90deg,#08E1F4,#086BFC,#AC31FB,#ED2E97,#FD6648)",
        }}
      />
      <div style={{ fontSize: 44, fontWeight: 700, marginTop: 42 }}>
        Concebimos experiencias indelebles
      </div>
      <div style={{ fontSize: 27, color: "#aab4bb", marginTop: 18 }}>
        Branding · Social · Web · Apps · Audiovisual — Maracaibo
      </div>
    </div>,
    { ...size },
  );
}
