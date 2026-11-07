import React from "react";

export default function Welcome({ onStart }) {
  return (
    <section className="welcome">
      
    <div className="floating">
        <div className="welcome-avatar-container">
            <img
                src="/images/Aathi_avatar.png"
                alt="Aathithya's pixel avatar"
                className="welcome-avatar"
            />
        </div>
    </div>


      <div className="eyebrow">
        A VERY SPECIAL GAME FOR
      </div>

      <h1>
        AATHITHYA
      </h1>

      <p>
        You've unlocked a brand new year of adventures.
        Ready to play?
      </p>

      <button className="pixel-btn" onClick={onStart}>
        ▶ PRESS START
      </button>

      <div className="hint">✦ MADE WITH LOVE ✦</div>
    </section>
  );
}
  