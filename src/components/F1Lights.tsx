import React, { useEffect, useState } from "react";

interface F1LightsProps {
  onComplete: () => void;
}

export default function F1Lights({ onComplete }: F1LightsProps) {
  const [lightsOut, setLightsOut] = useState(0);

  useEffect(() => {
    if (lightsOut >= 5) {
      const timeout = setTimeout(onComplete, 500);
      return () => clearTimeout(timeout);
    }
    const interval = setInterval(() => {
      setLightsOut((prev) => prev + 1);
    }, 600);
    return () => clearInterval(interval);
  }, [lightsOut, onComplete]);

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "40vh", gap: "1.5rem" }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "50%",
            background: i < lightsOut ? "#222" : "#e10600",
            boxShadow: i < lightsOut ? "none" : "0 0 32px 8px #e10600aa",
            border: "3px solid #333",
            transition: "background 0.3s, box-shadow 0.3s"
          }}
        />
      ))}
    </div>
  );
} 