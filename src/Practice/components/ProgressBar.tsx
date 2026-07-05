// App.jsx
import { useState, useEffect, useRef } from "react";

// ---- Reusable Bar ----
function ProgressBar({ value = 0 }) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      style={{ background: "#eee", borderRadius: 8, height: 24, width: "100%" }}
    >
      <div
        style={{
          width: `${value}%`,
          height: "100%",
          background: clamped < 40 ? "red" : clamped < 70 ? "orange" : "green",
          borderRadius: 8,
          transition: "width 0.1s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 12,
        }}
      >
        {clamped.toFixed(0)}%
      </div>
    </div>
  );
}

// ---- Animated Controller ----
export function ProgressBarExample() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | running | paused
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (status === "running") {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(intervalRef.current);
            setStatus("idle");
            return 100;
          }
          return prev + 1;
        });
      }, 50);
    }
    return () => clearInterval(intervalRef.current);
  }, [status]);

  const handleStart = () => {
    setProgress(0);
    setStatus("running");
  };
  const handlePause = () => setStatus("paused");
  const handleResume = () => setStatus("running");
  const handleReset = () => {
    setProgress(0);
    setStatus("idle");
  };

  return (
    <div style={{ width: 400, padding: 20 }}>
      <h1>{progress}</h1>
      <ProgressBar value={progress} />
      <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
        {status === "idle" && <button onClick={handleStart}>Start</button>}
        {status === "running" && <button onClick={handlePause}>Pause</button>}
        {status === "paused" && <button onClick={handleResume}>Resume</button>}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
