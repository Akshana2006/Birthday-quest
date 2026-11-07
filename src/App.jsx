
import React, { useState, useRef } from "react";
import Welcome from "./components/Welcome";
import PixelAdventure from "./components/PixelAdventure";
import BirthdayCake from "./components/BirthdayCake";
import MemoryChest from "./components/MemoryChest";
import SecretMessage from "./components/SecretMessage";
import BirthdayLetter from "./components/BirthdayLetter";
import MusicToggle from "./components/MusicToggle";

const TOTAL = 5;

export default function App() {
  const [level, setLevel] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const musicRef = useRef(null);
const clickSoundRef = useRef(null);
const wishSoundRef = useRef(null);

// Play the fairy-wand sound when making a wish
const playWishSound = () => {
  const sound = wishSoundRef.current;

  if (!sound) return;

  sound.pause();
  sound.currentTime = 0;
  sound.volume = 0.6;

  sound.play().catch((error) => {
    console.log("Wish sound could not play:", error);
  });
};




  // ----------------------------------------
  // Level navigation
  // ----------------------------------------

  const next = () => {
    setLevel((current) => Math.min(TOTAL, current + 1));
  };

  const reset = () => {
    setLevel(0);
    setConfetti(false);
  };

  // ----------------------------------------
  // Music controls
  // ----------------------------------------

  const playMusic = () => {
    const music = musicRef.current;
    if (!music) return;

    music.volume = 0.3;

    music
      .play()
      .then(() => setMusicPlaying(true))
      .catch((error) => {
        console.log("Music could not start:", error);
      });
  };

  const toggleMusic = () => {
    const music = musicRef.current;
    if (!music) return;

    if (music.paused) {
      playMusic();
    } else {
      music.pause();
      setMusicPlaying(false);
    }
  };

  const startAdventure = () => {
    playMusic();
    next();
  };

  // ----------------------------------------
  // Render current level
  // ----------------------------------------

  const renderLevel = () => {
    switch (level) {
      case 0:
        return <Welcome onStart={startAdventure} />;

      case 1:
        return <PixelAdventure onComplete={next} />;

      case 2:
        return (
        <BirthdayCake
          onComplete={next}
          onMakeWish={playWishSound}
        />
      );
      case 3:
        return <MemoryChest onComplete={next} />;

      case 4:
        return <SecretMessage onComplete={next} />;

      case 5:
        return (
          <BirthdayLetter
            onReplay={reset}
            onCelebrate={() => setConfetti(true)}
          />
        );

      default:
        return null;
    }
  };



const playClickSound = (event) => {
  const target = event.target;

  if (!(target instanceof Element)) return;

  const clickable = target.closest(
    'button, [role="button"], .gift-card, .memory-card, .polaroid'
  );

  if (!clickable || clickable.disabled) return;

  const sound = clickSoundRef.current;
  if (!sound) return;

  // Restart the sound immediately
  sound.pause();
  sound.currentTime = 0;
  sound.volume = 0.25;

  sound.play().catch(() => {});
};



  // ----------------------------------------
  // Main layout
  // ----------------------------------------

  return (
    <div
      className="world"
      onPointerDownCapture={playClickSound}
    >
      <audio
        ref={musicRef}
        src="/audio/aathithya-birthday-chiptune.wav"
        loop
        preload="auto"
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
      />

      <audio
      ref={wishSoundRef}
      src="/audio/fairy-wand.mp3"
      preload="auto"
    />

    <audio
      ref={clickSoundRef}
      src="/audio/click.mp3"
      preload="auto"
    />

      <MusicToggle
        musicPlaying={musicPlaying}
        onToggle={toggleMusic}
      />

      <div className="stars" aria-hidden="true">
        ✦　 ·　 ✧　　✦　 ·　 ✧　 ✦
      </div>

      <header className="top">
        <span>★ BIRTHDAY QUEST</span>
        <span>PLAYER: AATHITHYA</span>
      </header>

      <main className="game">
        <div className="hud">
          <span>
            🕹️ LEVEL {String(level).padStart(2, "0")}
          </span>

          <span>
            {level === 0
              ? "READY TO PLAY"
              : level === 5
              ? "QUEST COMPLETE"
              : "QUEST IN PROGRESS"}
          </span>
        </div>

        <div className="scene">
          <div className="sun" />

          <div className="cloud cloud-a">☁</div>
          <div className="cloud cloud-b">☁</div>

          <div className="hills" />
          <div className="ground" />

          <div className="flowers" aria-hidden="true">
            🌷　🌼　🌸　🌷　🌼　🌸
          </div>

          <div className="scene-content">
            {renderLevel()}
          </div>
        </div>

        <div className="footer-bar">
          <div className="game-hearts">
            <span>♥</span>
            <span>♥</span>
            <span>♥</span>
      </div>

          <span>
            {level === 0
              ? "INSERT COIN? NOPE, JUST LOVE."
              : `STAGE ${Math.min(level, TOTAL)} / ${TOTAL}`}
          </span>

          <span>✦ ✦ ✦</span>
        </div>
      </main>

      <footer>
        HANDCRAFTED FOR AATHITHYA • 2026
      </footer>

      {confetti && (
        <div className="confetti" aria-hidden="true">
          {Array.from({ length: 35 }, (_, i) => (
            <span
              key={i}
              style={{
                left: `${(i * 37) % 100}%`,
                animationDelay: `${(i % 9) * 0.15}s`,
                color: [
                  "#ff7bbd",
                  "#f7d66c",
                  "#a48dff",
                  "#79d9d2",
                ][i % 4],
              }}
            >
              ✦
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

