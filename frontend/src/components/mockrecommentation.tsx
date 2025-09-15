import React from "react";

const Recommendations: React.FC = () => {
  return (
    <div className="recommendations-container">
      <h2 className="recommendations-title">Recommended Skincare Routine</h2>

      {/* 🌞 Morning */}
      <div className="routine-section">
        <h3 className="routine-heading">🌞 Morning Routine</h3>
        <ul className="routine-list">
          <li>Gentle Hydrating Cleanser – removes impurities without stripping natural oils.</li>
          <li>Antioxidant Serum (Vitamin C or Peptides) – brightens skin, reduces oxidative stress, and protects against aging.</li>
          <li>Moisturizer with Hyaluronic Acid – locks in hydration to plump fine lines.</li>
          <li>Broad-Spectrum Sunscreen SPF 50 – prevents further wrinkle formation and sun-induced aging.</li>
        </ul>
      </div>

      {/* 🌙 Night */}
      <div className="routine-section">
        <h3 className="routine-heading">🌙 Night Routine</h3>
        <ul className="routine-list">
          <li>Gentle Cleanser – clears dirt, oil, and pollution.</li>
          <li>Retinol Serum or Cream – boosts collagen, smooths fine lines, and improves texture. <br />
            <span className="note">(Start with low concentration, 2–3 times a week, increase as tolerated)</span>
          </li>
          <li>Nourishing Moisturizer (with Ceramides or Peptides) – restores skin barrier and supports overnight repair.</li>
        </ul>
      </div>

      {/* 💡 Tips */}
      <div className="routine-section">
        <h3 className="routine-heading">💡 Additional Tips</h3>
        <ul className="routine-list">
          <li>Stay consistent: anti-aging routines need regular application for visible results.</li>
          <li>Add an eye cream with peptides or retinol if wrinkles are prominent around the eyes.</li>
          <li>Maintain hydration (drink water, balanced diet).</li>
        </ul>
      </div>

      {/* ✅ Summary */}
      <div className="routine-section summary">
        <h3 className="routine-heading">✅ Summary</h3>
        <p>Your routine should focus on <strong>hydration + collagen support + sun protection</strong>.</p>
        <p>Hero products: <strong>Vitamin C (AM)</strong>, <strong>Retinol (PM)</strong>, and <strong>Sunscreen (daily)</strong>.</p>
      </div>
    </div>
  );
};

export default Recommendations;
