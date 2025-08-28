export default function StrikeZone() {
  return (
    <div className="page-layout">
      {/* Left panel: table */}
      <div className="table">table</div>

      {/* Top-right controls */}
      <div className="start-stop-container">
        <button className="control-btn start">Start</button>
        <button className="control-btn stop">Stop</button>
      </div>

      <div className="pitch-type-container">
        <button className="pitch-btn">Four Seam</button>
        <button className="pitch-btn">12–6 Curveball</button>
      </div>

      {/* Intended zone (simple 3×3 grid) */}
      <div className="intended-zone">
        {[...Array(9)].map((_, i) => (
          <button key={i} className="strike">{i + 1}</button>
        ))}
      </div>

      {/* Actual zone (3×3 strike + outer miss ring) */}
      <div className="actual-zone">
        {/* Inner strike zone */}
        {[...Array(9)].map((_, i) => (
          <button key={i} className={`strike az${i + 1}`}>{i + 1}</button>
        ))}

        {/* Outer miss buttons */}
        <button className="miss ATL">TL</button>
        <button className="miss ATT">TT</button>
        <button className="miss ATR">TR</button>
        <button className="miss AML">ML</button>
        <button className="miss AMR">MR</button>
        <button className="miss ABL">BL</button>
        <button className="miss ABB">BB</button>
        <button className="miss ABR">BR</button>
      </div>
    </div>
  );
}
