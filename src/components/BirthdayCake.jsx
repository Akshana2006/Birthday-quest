
import React, { useState, useRef, useEffect } from "react";

export default function BirthdayCake({
  onComplete,
  onMakeWish
})  {
  const [candles, setCandles] = useState(Array(14).fill(true));
  const [wish, setWish] = useState(false);

  const audioContextRef = useRef(null);

  useEffect(() => {
    return () => {
      const ctx = audioContextRef.current;
      if (ctx && ctx.state !== "closed") {
        ctx.close();
      }
    };
  }, []);

  const playBlowSound = () => {
    try {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

      if (!AudioContextClass) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
      }

      const ctx = audioContextRef.current;

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const duration = 0.35;
      const buffer = ctx.createBuffer(
        1,
        Math.floor(ctx.sampleRate * duration),
        ctx.sampleRate
      );

      const data = buffer.getChannelData(0);

      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 850;

      const gain = ctx.createGain();
      const now = ctx.currentTime;

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.13, now + 0.06);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + duration
      );

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      source.start(now);
      source.stop(now + duration);
    } catch (error) {
      console.log("Sound unavailable:", error);
    }
  };

  const blowOutCandle = (index) => {
    if (!candles[index] || wish) return;

    playBlowSound();

    setCandles((previous) =>
      previous.map((lit, i) =>
        i === index ? false : lit
      )
    );
  };

  const remaining = candles.filter(Boolean).length;

  const makeWish = () => {
    if (remaining !== 0) return;
    setWish(true);
  };

  return (
    <section className="birthday-panel">
      <div className="eyebrow">
        LEVEL 02 • MAKE A WISH
      </div>

      <h2>Birthday Cake! 🎂</h2>

      <p>Tap the candles to blow them out!</p>

      {/* Avatar and cake always stay on screen */}
      
<div
  className={`birthday-layout ${
    wish ? "wish-mode" : ""
  }`}
>
  {/* Avatar stays, but becomes centered after the wish */}
  <div className="birthday-avatar-scene">
    <img
      src={
        wish
          ? "/images/wish-avatar.png"
          : "/images/cheering-avatar.png"
      }
      alt="Aathithya celebrating"
      className="birthday-character"
    />

    {/* Rewards appear after making a wish */}
    {wish && (
      <div
        className="birthday-rewards"
        aria-hidden="true"
      >
        {[
          "hearts",
          "star",
          "gift",
          "letter",
          "cake"
        ].map((item) => (
          <img
            key={item}
            src={`/images/rewards/${item}.png`}
            className={`reward reward-${item}`}
            alt=""
          />
        ))}
      </div>
    )}
  </div>

  {/* Cake disappears after making a wish */}
  {!wish && (
    <div className="birthday-cake">
      <div className="birthday-candles">
        {candles.map((lit, i) => (
          <button
            key={i}
            type="button"
            className={`birthday-candle ${
              lit ? "is-lit" : "is-out"
            }`}
            onClick={() => blowOutCandle(i)}
            disabled={!lit}
            aria-label={`Blow out candle ${i + 1}`}
          >
            <span className="candle-flame">
              {lit ? "🔥" : "💨"}
            </span>
            <span className="candle-stick" />
          </button>
        ))}
      </div>

      <div className="cake-top" />

      <div className="cake-base">
            ✦ HAPPY BIRTHDAY ✦
    </div>

      <div className="cake-plate" />
    </div>
  )}
</div>


      {/* Candle progress */}
      <p className="quest-counter">
            {wish
                ? "★ WISH GRANTED! ★"
                : remaining === 0
                ? "ALL CANDLES OUT! ✨"
                : `${14 - remaining} / 14 CANDLES BLOWN OUT`}
    </p>

      {/* Wish button */}
      {remaining === 0 && !wish && (
        <button
            className="pixel-btn"
            onClick={() => {
            onMakeWish();
            setWish(true);
        }}
>
  ✨ MAKE A WISH
</button>
      )}

      {/* Final wish celebration */}
      {wish && (
        <>
          <p className="success">
            Your wish has been sent to the stars! 🌟
          </p>

          <button
            className="pixel-btn"
            onClick={onComplete}
          >
            NEXT LEVEL →
          </button>
        </>
      )}
    </section>
  );
}
