
import React from "react";

export default function SecretMessage({ onComplete }) {
  return (
    <section>
      <div className="eyebrow">
        LEVEL 04 • SECRET MESSAGE
      </div>

      {/* Floating pixel-art envelope */}
      <div className="secret-envelope-wrapper">
        <img
          src="/images/rewards/letter.png"
          alt="A secret birthday letter"
          className="secret-envelope"
        />
      </div>

      <h2>One last surprise...</h2>

      <p>A special message is waiting for you.</p>

      <button
        className="pixel-btn"
        onClick={onComplete}
      >
        OPEN THE LETTER →
      </button>
    </section>
  );
}
