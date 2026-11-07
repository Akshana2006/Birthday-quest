import React, { useState } from "react";

const memories = [
  {
    photo: "/images/memories/memory1.jpg",
    title: "Little moments",
    caption: "little moments ♡",
    body: "Some of the best memories are the smallest ones.",
  },
  {
    photo: "/images/memories/memory2.jpg",
    title: "Our adventures",
    caption: "Our adventures ✨",
    body: "Life is more fun when we get to share the journey.",
  },
  {
    photo: "/images/memories/memory3.jpg",
    title: "Always family",
    caption: "you & me ♡",
    body: "No matter how many levels we clear, I will always be cheering for you.",
  },
];

export default function MemoryChest({ onComplete }) {
  const [opened, setOpened] = useState([]);

  const openMemory = (index) => {
    setOpened((previous) =>
      previous.includes(index)
        ? previous
        : [...previous, index]
    );
  };

  return (
    <section>
      <div className="eyebrow">
        LEVEL 03 • MEMORY CHEST
      </div>

      <h2 className="memory-heading">
          Open the treasures
            <img
            src="/images/rewards/gift.png"
            alt=""
            className="memory-heading-icon"
            />
            </h2>
      <p>Three little memories, just for you.</p>

      <div className="memory-grid">
        {memories.map((memory, i) => {
          const isOpen = opened.includes(i);

          return (
            <button
              key={i}
              className={`memory ${
                isOpen ? "memory-open" : ""
              }`}
              onClick={() => openMemory(i)}
            >
              {isOpen ? (
                <div className="polaroid">
                  <img
                    src={memory.photo}
                    alt={memory.title}
                    className="memory-photo"
                  />

                  <span className="polaroid-caption">
                    {memory.caption}
                  </span>
                </div>
              ) : (
                <img
                    src="/images/rewards/gift.png"
                    alt="Mystery gift"
                    className="memory-gift-icon"
/>
              )}

              <strong>
                {isOpen
                  ? memory.title
                  : `Mystery ${i + 1}`}
              </strong>

              <small>
                {isOpen
                  ? memory.body
                  : "Tap to unlock"}
              </small>
            </button>
          );
        })}
      </div>

      {opened.length === memories.length && (
        <button
          className="pixel-btn"
          onClick={onComplete}
        >
          FINAL LEVEL →
        </button>
      )}
    </section>
  );
}
