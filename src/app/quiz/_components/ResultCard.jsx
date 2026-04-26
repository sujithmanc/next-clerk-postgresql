"use client";

import Image from "next/image";
import { Trophy, CheckCircle, Star } from "lucide-react";

export default function ResultCard({
  imageUrl,
  fullName,
  testName,
  maxScore = 100,
  userScore = 80,
}) {
  const firstName = fullName?.split(" ")[0] ?? "there";
  const percentage = Math.round((userScore / maxScore) * 100);

  const getPercentileLabel = (pct) => {
    if (pct >= 90) return "Top 10%";
    if (pct >= 80) return "Top 20%";
    if (pct >= 70) return "Top 30%";
    if (pct >= 50) return "Top 50%";
    return "Participant";
  };

  const getRankEmoji = (pct) => {
    if (pct >= 90) return "🥇";
    if (pct >= 75) return "🥈";
    if (pct >= 50) return "🥉";
    return "🎖️";
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Outer page bg — dark on desktop so the card floats */
        .result-page {
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #06060f;
          padding: 2rem 1rem;
        }

        /* The poster itself */
        .result-poster {
          position: relative;
          width: 100%;
          max-width: 400px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;

          /* desktop: card look */
          border-radius: 28px;
          padding: 40px 28px 36px;
          min-height: 680px;
          background: linear-gradient(160deg, #0f0f1a 0%, #111128 50%, #0f1520 100%);
        }

        /* Mobile: strip the card — full bleed */
        @media (max-width: 639px) {
          .result-page {
            padding: 0;
            background: #0f0f1a; /* match poster bg so seam is invisible */
          }
          .result-poster {
            max-width: 100%;
            border-radius: 0;
            min-height: 100svh;
            padding: 52px 24px 40px;
          }
        }
      `}</style>

      <div className="result-page">
        <div className="result-poster">

          {/* ── Hex background pattern ── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.18 }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="hex" x="0" y="0" width="40" height="46" patternUnits="userSpaceOnUse">
                <polygon
                  points="20,2 38,12 38,34 20,44 2,34 2,12"
                  fill="none"
                  stroke="rgba(244,185,66,0.6)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hex)" />
          </svg>

          {/* ── Glow blobs ── */}
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 280, height: 280,
              background: "radial-gradient(circle,#f4b942 0%,transparent 70%)",
              top: -70, left: "50%", transform: "translateX(-50%)",
              opacity: 0.22, filter: "blur(64px)",
            }}
          />
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 200, height: 200,
              background: "radial-gradient(circle,#3b82f6 0%,transparent 70%)",
              bottom: 60, right: -40,
              opacity: 0.15, filter: "blur(60px)",
            }}
          />
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 180, height: 180,
              background: "radial-gradient(circle,#8b5cf6 0%,transparent 70%)",
              bottom: 80, left: -40,
              opacity: 0.12, filter: "blur(60px)",
            }}
          />

          {/* ── Corner accents ── */}
          <CornerAccent className="absolute top-5 left-5" />
          <CornerAccent className="absolute bottom-5 right-5 rotate-180" />

          {/* ── Top label ── */}
          <div
            className="relative z-10 flex items-center gap-1.5 mb-7"
            style={{
              background: "rgba(244,185,66,0.12)",
              border: "1px solid rgba(244,185,66,0.25)",
              borderRadius: "100px",
              padding: "5px 14px",
            }}
          >
            <Trophy size={13} color="#f4b942" />
            <span
              className="font-semibold tracking-widest uppercase"
              style={{ fontSize: 11, color: "#f4b942" }}
            >
              {testName ?? "Quiz Result"}
            </span>
          </div>

          {/* ── Avatar with rings ── */}
          <div className="relative z-10 mb-7" style={{ width: 140, height: 140, flexShrink: 0 }}>
            {/* Outer dashed orbit */}
            <div
              className="absolute rounded-full"
              style={{
                inset: -14,
                border: "1.5px dashed rgba(244,185,66,0.25)",
                animation: "spin 20s linear infinite",
              }}
            />
            {/* Conic glow ring */}
            <div
              className="absolute rounded-full"
              style={{
                inset: -4,
                background: "conic-gradient(from 0deg,#f4b942,#ff6b35,#f4b942,#ffd700,#f4b942)",
                padding: 3,
                animation: "spin 8s linear infinite",
              }}
            >
              <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#111128" }} />
            </div>

            {/* Image or initials */}
            <div
              className="absolute flex items-center justify-center overflow-hidden"
              style={{
                inset: 4,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#1e293b,#0f172a)",
                zIndex: 1,
              }}
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={fullName ?? "User"}
                  width={132}
                  height={132}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span style={{ fontSize: 40, fontWeight: 800, color: "#f4b942", lineHeight: 1 }}>
                  {fullName?.split(" ").slice(0, 2).map((n) => n[0]).join("") ?? "?"}
                </span>
              )}
            </div>

            {/* Star badge */}
            <div
              className="absolute flex items-center justify-center z-10"
              style={{
                bottom: 2, right: 2,
                width: 32, height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#f4b942,#ff8c42)",
                border: "3px solid #111128",
                boxShadow: "0 0 12px rgba(244,185,66,0.5)",
              }}
            >
              <Star size={14} color="#fff" fill="#fff" />
            </div>
          </div>

          {/* ── Name & test ── */}
          <div className="relative z-10 text-center mb-6">
            <h1 className="font-extrabold text-white leading-tight mb-1" style={{ fontSize: 24 }}>
              Great job, {firstName}! 🎉
            </h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              {testName ?? "Quiz"}
            </p>
          </div>

          {/* ── Divider ── */}
          <div
            className="relative z-10 w-full mb-6"
            style={{
              height: 1,
              background: "linear-gradient(to right,transparent,rgba(244,185,66,0.3),transparent)",
            }}
          />

          {/* ── Score block ── */}
          <div
            className="relative z-10 w-full text-center mb-5"
            style={{
              background: "rgba(244,185,66,0.06)",
              border: "1px solid rgba(244,185,66,0.15)",
              borderRadius: 20,
              padding: "24px 20px",
            }}
          >
            <p
              className="uppercase tracking-widest mb-2.5"
              style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 500 }}
            >
              Your Score
            </p>
            <p
              className="font-extrabold leading-none mb-1"
              style={{
                fontSize: 56,
                background: "linear-gradient(135deg,#ffd700,#f4b942,#ff8c42)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {userScore}
            </p>
            <p className="mb-4" style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>
              out of {maxScore} points
            </p>

            <div
              className="w-full mb-2"
              style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 100, overflow: "hidden" }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${percentage}%`,
                  background: "linear-gradient(to right,#f4b942,#ff8c42)",
                  borderRadius: 100,
                }}
              />
            </div>
            <p className="font-bold" style={{ fontSize: 13, color: "#f4b942" }}>
              {percentage}% Achieved
            </p>
          </div>

          {/* ── Stats row ── */}
          <div
            className="relative z-10 w-full grid mb-5"
            style={{
              gridTemplateColumns: "1fr 1px 1fr",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <div className="text-center" style={{ padding: "14px 12px" }}>
              <div className="text-xl mb-0.5">{getRankEmoji(percentage)}</div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>
                Rank
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.07)" }} />
            <div className="text-center" style={{ padding: "14px 12px" }}>
              <div className="font-bold mb-0.5" style={{ fontSize: 18, color: "#f4b942" }}>
                {getPercentileLabel(percentage)}
              </div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>
                Percentile
              </div>
            </div>
          </div>

          {/* ── Success pill ── */}
          <div
            className="relative z-10 flex items-center gap-2 mb-7"
            style={{
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: 100,
              padding: "8px 18px",
            }}
          >
            <CheckCircle size={15} color="#22c55e" />
            <span className="font-medium" style={{ fontSize: 13, color: "#4ade80" }}>
              Submitted Successfully
            </span>
          </div>

          {/* ── Footer ── */}
          <p
            className="relative z-10 text-center tracking-wider"
            style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}
          >
            Screenshot & share your achievement ✦
          </p>

        </div>
      </div>
    </>
  );
}

function CornerAccent({ className = "" }) {
  return (
    <svg
      className={className}
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.4, zIndex: 1 }}
    >
      <path d="M4 4 L28 4" stroke="#f4b942" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 4 L4 28" stroke="#f4b942" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 4 L20 20" stroke="rgba(244,185,66,0.3)" strokeWidth="1" strokeLinecap="round" />
      <circle cx="28" cy="4" r="2" fill="#f4b942" />
      <circle cx="4" cy="28" r="2" fill="#f4b942" />
    </svg>
  );
}
