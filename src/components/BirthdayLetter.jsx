
import React, { useEffect, useRef } from "react";

export default function BirthdayLetter({
  onReplay,
  onCelebrate,
}) {
  const cheerRef = useRef(null);
  const hasCelebrated = useRef(false);

  useEffect(() => {
    if (hasCelebrated.current) return;

    hasCelebrated.current = true;

    // Trigger confetti
    onCelebrate();

    // Play cheering sound
    const cheer = cheerRef.current;

    if (cheer) {
      cheer.volume = 0.8;
      cheer.currentTime = 0;

      cheer.play().catch((error) => {
        console.log("Cheering sound could not play:", error);
      });
    }
  }, [onCelebrate]);

  return (
    <section>
      <audio
        ref={cheerRef}
        src="/audio/cheering.mp3"
        preload="auto"
      />

      <div className="eyebrow">
        ★ QUEST COMPLETE ★
      </div>

      <h2>
        Happy Birthday,
        <br />
        Aathithya! 🎉
      </h2>

      <div className="letter">
        <h3>Dear Aathithya, 💖</h3>

        <p>
          Happy 14th Birthday, little sister!
          Every year is a new adventure, and
          I hope this next chapter is full of
          laughter, exciting discoveries,
          and wonderful memories.
        </p>

        <p>
          Keep being your amazing self.
          I'm so lucky you're my little sister,
          and I'll always be rooting for you,
          no matter what level life brings next.
        </p>

        <p>
          With lots of love,
          <br />
          Akka 💗
        </p>
      </div>

      <button
        className="secondary-btn"
        onClick={onReplay}
      >
        ↻ PLAY AGAIN
      </button>
    </section>
  );
}
