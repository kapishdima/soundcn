import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "soundcn - Free Sound Effects for Modern Web Apps";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const barHeights = [
    55, 80, 40, 95, 60, 85, 35, 70, 50, 90, 45, 75, 65, 55, 88, 42, 72, 58,
    82, 48,
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1c1b2e",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Equalizer bars */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "12px",
            height: "160px",
            marginBottom: "48px",
          }}
        >
          {barHeights.map((h, i) => (
            <div
              key={i}
              style={{
                width: "20px",
                height: `${h * 1.6}px`,
                backgroundColor: "#d4952a",
                borderRadius: "6px",
                opacity: 0.6 + (h / 95) * 0.4,
              }}
            />
          ))}
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: "72px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-2px",
          }}
        >
          soundcn
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: "28px",
            color: "#d4952a",
            marginTop: "16px",
            letterSpacing: "1px",
          }}
        >
          Free Sound Effects for Modern Web Apps
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            fontSize: "20px",
            color: "rgba(255, 255, 255, 0.5)",
            marginTop: "12px",
          }}
        >
          Copy. Paste. Play.
        </div>
      </div>
    ),
    { ...size }
  );
}
