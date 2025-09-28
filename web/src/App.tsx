import { useState } from "react";

export default function StrikeZone() {

  const [isRunning, setIsRunning] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // ---------- CONTROL BUTTONS ----------
  async function handleControlStart() {
    try {
      const res = await fetch("http://127.0.0.1:8000/sessions/start", { method: "POST" });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setSessionId(data.sessionId);
      setIsRunning(true);
      console.log("session started:", data.sessionId);
    } catch (err) {
      console.error("Failed to start session:", err);
      alert("Could not start session. Check server.");
    }
  }

  async function handleControlStop() {
    if (!sessionId) return;
    try {
      await fetch(`http://127.0.0.1:8000/sessions/${sessionId}/end`, { method: "POST" });
      console.log("session ended");
    } catch (err) {
      console.error("Failed to end session:", err);
    } finally {
      setIsRunning(false);
      setSessionId(null);
    }
  }
  function handlePitchTypeFourSeam() {
    console.log("four seam");
  }

  function handlePitchType126Curveball() {
    console.log("12-6 curveball");
  }
  async function handleIntendedZone(zone: number) {
    console.log("intended zone", zone);

    try {
      await fetch("http://127.0.0.1:8000/pitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zone })   // zone is already a number
      });
    } catch (err) {
      console.error("POST failed:", err);
    }
  }

  function handleActualZone(zone: number | string) {
    console.log("actual zone", zone);
  }
  return (
    <div className="page-layout">
      {/* Left panel: table */}
      <div className="table">table</div>

      {/* Top-right controls */}
      <div className="start-stop-container">
        <button
          className="control-btn start"
          onClick={handleControlStart}
          disabled={isRunning}
        >
          Start
        </button>
        <button
          className="control-btn stop"
          onClick={handleControlStop}
          disabled={!isRunning}
        >
          Stop
        </button>
      </div>

      <div className="pitch-type-container">
        <button className="pitch-btn" onClick={handlePitchTypeFourSeam}>Four Seam</button>
        <button className="pitch-btn" onClick={handlePitchType126Curveball}>12–6 Curveball</button>
      </div>

      {/* Intended zone (simple 3×3 grid) */}
      <div className="intended-zone">
        {[...Array(9)].map((_, i) => (
          <button key={i} className="strike" onClick={() => handleIntendedZone(i + 1)}>{i + 1}</button>
        ))}
      </div>

      {/* Actual zone (3×3 strike + outer miss ring) */}
      <div className="actual-zone">
        {/* Inner strike zone */}
        {[...Array(9)].map((_, i) => (
          <button key={i} className={`strike az${i + 1}`} onClick={() => handleActualZone(i + 1)}>{i + 1}</button>
        ))}

        {/* Outer miss buttons */}
        <button className="miss ATL" onClick={() => handleActualZone("ATL")}>TL</button>
        <button className="miss ATT" onClick={() => handleActualZone("ATT")}>TT</button>
        <button className="miss ATR" onClick={() => handleActualZone("ATR")}>TR</button>
        <button className="miss AML" onClick={() => handleActualZone("AML")}>ML</button>
        <button className="miss AMR" onClick={() => handleActualZone("AMR")}>MR</button>
        <button className="miss ABL" onClick={() => handleActualZone("ABL")}>BL</button>
        <button className="miss ABB" onClick={() => handleActualZone("ABB")}>BB</button>
        <button className="miss ABR" onClick={() => handleActualZone("ABR")}>BR</button>
      </div>
    </div>
  );
}
