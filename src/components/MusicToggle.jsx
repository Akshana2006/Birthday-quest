import React from "react";

export default function MusicToggle({
  musicPlaying,
  onToggle,
}) {
  return (
    <button
      className="music-toggle"
      onClick={onToggle}
      aria-label={
        musicPlaying ? "Turn music off" : "Turn music on"
      }
      aria-pressed={musicPlaying}
    >
      {musicPlaying ? "🔊" : "🔇"}
    </button>
  );
}
