import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Bible Quiz";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
                    backgroundColor: "#1a1a2e",
                    fontFamily: "serif",
                }}
            >
                {/* Background accent */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                            "radial-gradient(circle at 30% 50%, #16213e 0%, #1a1a2e 70%)",
                        display: "flex",
                    }}
                />

                {/* Cross icon */}
                <div style={{ fontSize: 80, marginBottom: 20, display: "flex" }}>
                    ✝️
                </div>

                {/* Title */}
                <div
                    style={{
                        fontSize: 72,
                        fontWeight: "bold",
                        color: "#f5c518",
                        marginBottom: 16,
                        display: "flex",
                    }}
                >
                    "Bible Quiz | Telugu | The Book of Ruth"
                </div>

                {/* Subtitle */}
                <div
                    style={{
                        fontSize: 32,
                        color: "#e0e0e0",
                        textAlign: "center",
                        maxWidth: 800,
                        display: "flex",
                    }}
                >
                    Test your knowledge and grow spiritually
                </div>

                {/* CTA badge */}
                <div
                    style={{
                        marginTop: 40,
                        backgroundColor: "#f5c518",
                        color: "#1a1a2e",
                        padding: "12px 40px",
                        borderRadius: 50,
                        fontSize: 28,
                        fontWeight: "bold",
                        display: "flex",
                    }}
                >
                    Start the Quiz →
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}