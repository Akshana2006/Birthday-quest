
import React, { useState, useEffect, useRef } from "react";

const treasures = Array.from({ length: 14 }, (_, i) => ({
  x: 10 + (i % 7) * 13,
  y: 18 + Math.floor(i / 7) * 48,
}));

// Keep your existing PixelAdventure function here.
// ==========================================
// LEVEL 01 - PIXEL ADVENTURE
// ==========================================

function PixelAdventure({ onComplete }) {
  const [pos, setPos] = useState({ x: 50, y: 75 });
  const [direction, setDirection] = useState("down");
  const [isWalking, setIsWalking] = useState(false);
  const [walkFrame, setWalkFrame] = useState(1);
  const [found, setFound] = useState([]);

  const held = useRef(new Set());
  const touchHeld = useRef(new Set());

  // ----------------------------------------
  // Walking animation
  // ----------------------------------------

  useEffect(() => {
    if (!isWalking) {
      setWalkFrame(1);
      return;
    }

    const timer = setInterval(() => {
      setWalkFrame((frame) => (frame % 4) + 1);
    }, 150);

    return () => clearInterval(timer);
  }, [isWalking]);

  // ----------------------------------------
  // iPhone touch controls
  // ----------------------------------------

  const pressProps = (key) => ({
    onPointerDown: (e) => {
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      touchHeld.current.add(key);
    },

    onPointerUp: () => touchHeld.current.delete(key),

    onPointerCancel: () => touchHeld.current.delete(key),

    onLostPointerCapture: () => touchHeld.current.delete(key),
  });

  // ----------------------------------------
  // Keyboard and touch movement
  // ----------------------------------------

  useEffect(() => {
    const down = (e) => {
      const key = e.key.toLowerCase();

      if (
        [
          "arrowup",
          "arrowdown",
          "arrowleft",
          "arrowright",
          "w",
          "a",
          "s",
          "d",
        ].includes(key)
      ) {
        e.preventDefault();
        held.current.add(key);
      }
    };

    const up = (e) => {
      held.current.delete(e.key.toLowerCase());
    };

    const clearKeys = () => {
      held.current.clear();
      touchHeld.current.clear();
      setIsWalking(false);
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clearKeys);

    const timer = setInterval(() => {
      // Combine keyboard and touch inputs
      const keys = new Set([
        ...held.current,
        ...touchHeld.current,
      ]);

      const dx =
        (keys.has("arrowright") || keys.has("d") ? 2 : 0) -
        (keys.has("arrowleft") || keys.has("a") ? 2 : 0);

      const dy =
        (keys.has("arrowdown") || keys.has("s") ? 2 : 0) -
        (keys.has("arrowup") || keys.has("w") ? 2 : 0);

      const moving = dx !== 0 || dy !== 0;

      setIsWalking(moving);

      if (moving) {
        // Face the direction of movement
        if (Math.abs(dx) >= Math.abs(dy) && dx !== 0) {
          setDirection(dx > 0 ? "right" : "left");
        } else {
          setDirection(dy > 0 ? "down" : "up");
        }

        // Update character position
        setPos((p) => ({
          x: Math.max(4, Math.min(96, p.x + dx)),
          y: Math.max(9, Math.min(90, p.y + dy)),
        }));
      }
    }, 35);

    return () => {
      clearInterval(timer);

      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clearKeys);
    };
  }, []);

  // ----------------------------------------
  // Heart collection
  // ----------------------------------------

  useEffect(() => {
    setFound((old) => {
      const nearby = treasures.flatMap((t, i) =>
        Math.abs(t.x - pos.x) < 6 &&
        Math.abs(t.y - pos.y) < 9
          ? [i]
          : []
      );

      return nearby.every((i) => old.includes(i))
        ? old
        : [...new Set([...old, ...nearby])];
    });
  }, [pos]);

  // ----------------------------------------
  // Adventure UI
  // ----------------------------------------

  return (
    <section className="adventure-panel enchanted-panel">
      <div className="eyebrow">
        ✦ LEVEL 01 • THE ENCHANTED KINGDOM ✦
      </div>

      <h2>The 14 Lost Hearts 💗</h2>

      <p>
        Explore the enchanted garden! Collect 14 hearts
        to awaken the birthday portal.
      </p>

      <div
        className="playfield enchanted-field"
        aria-label="Magical garden with fourteen collectible hearts"
      >
        <div className="magic-path" />

        <div className="magic-pond" aria-hidden="true">
          ✧
        </div>

        {/* Magical trees */}
        {[
          [5, 6],
          [92, 7],
          [6, 80],
          [91, 78],
        ].map(([x, y], i) => (
          <span
            key={"tree" + i}
            className="magic-tree"
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
          >
            🌸
          </span>
        ))}

        {/* Mushrooms */}
        {[
          [18, 38],
          [83, 37],
          [22, 88],
          [78, 87],
        ].map(([x, y], i) => (
          <span
            key={"mush" + i}
            className="magic-mushroom"
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
          >
            🍄
          </span>
        ))}

        {/* Sparkles */}
        {[
          [32, 12],
          [71, 29],
          [29, 70],
          [67, 83],
        ].map(([x, y], i) => (
          <span
            key={"spark" + i}
            className="magic-sparkle"
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
          >
            ✦
          </span>
        ))}

        {/* Collectible hearts */}
        {treasures.map(
          (t, i) =>
            !found.includes(i) && (
              <span
                key={i}
                className="garden-heart enchanted-heart"
                style={{
                  left: `${t.x}%`,
                  top: `${t.y}%`,
                }}
              >
                💗
              </span>
            )
        )}

        {/* Birthday portal */}
        <div
          className="magic-portal"
          style={{
            opacity: found.length === 14 ? 1 : 0.35,
          }}
        >
          🌀
        </div>

        {/* Player */}
        <div
          className={`player facing-${direction}`}
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
          }}
        >
          <img
            src={
              isWalking
                ? `/images/aathithya-${direction}-${walkFrame}.png`
                : "/images/aathithya-idle-1.png"
            }
            alt="Aathithya's pixel character"
            className="player-avatar"
          />

          <span>AATHITHYA</span>
        </div>
      </div>

      {/* Heart counter */}
      <div className="quest-counter">
        💖 {found.length} / 14 hearts collected
      </div>

      {/* Movement controls */}
      <div className="dpad" aria-label="Movement controls">
        <button
          aria-label="Move up"
          {...pressProps("arrowup")}
        >
          ▲
        </button>

        <div>
          <button
            aria-label="Move left"
            {...pressProps("arrowleft")}
          >
            ◀
          </button>

          <button
            aria-label="Move down"
            {...pressProps("arrowdown")}
          >
            ▼
          </button>

          <button
            aria-label="Move right"
            {...pressProps("arrowright")}
          >
            ▶
          </button>
        </div>
      </div>

      {/* Level completion */}
      {found.length === 14 && (
        <>
          <p className="success">
            ✨ The birthday portal is awake! ✨
          </p>

          <button
            className="pixel-btn"
            onClick={onComplete}
          >
            ENTER THE PORTAL →
          </button>
        </>
      )}
    </section>
  );
}


export default PixelAdventure;
