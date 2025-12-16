import React, { useRef, useEffect } from 'react';

function MusicPlayer({ audioSrc }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if(audioRef.current){
      audioRef.current.play();
    }
  }, [audioSrc]);

  return (
    <div className="mt-3">
      <audio ref={audioRef} controls src={audioSrc} style={{ width: "100%" }} />
    </div>
  );
}

export default MusicPlayer;
