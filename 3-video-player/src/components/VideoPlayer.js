import React, { Fragment, useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import poster from "../img/freepik-poster.jpg";
import videoSrc from "../videos/gone.mp4";

const VideoPlayer = props => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const video = useRef(null);

  useEffect(() => {
    if (playing) video.current.play();
    else video.current.pause();
  }, [playing]);

  useEffect(() => {
    if (!video.current) return;

    video.current.addEventListener("timeupdate", updateProgress);
  }, [video.current]);

  const togglePlaying = e => {
    setPlaying(!playing);
  };

  const onStop = e => {
    setPlaying(false);
    video.current.currentTime = 0;
  };

  const updateProgress = e => {
    setProgress((video.current.currentTime / video.current.duration) * 100);
  };

  const onSeek = e => {
    const current =
      (parseInt(e.target.value, 10) * video.current.duration) / 100;
    video.current.currentTime = current;
  };

  return (
    <Fragment>
      <div className="container">
        <h1>Custom Video Player</h1>
        <div className="player">
          <video
            ref={video}
            src={videoSrc}
            id="video"
            className="screen"
            poster={poster}
            onClick={togglePlaying}
          ></video>
        </div>
        <div className="controls">
          <button className="btn" onClick={togglePlaying}>
            {playing ? (
              <FontAwesomeIcon
                icon={["fas", "pause"]}
                className="pause"
                id="pause"
              />
            ) : (
              <FontAwesomeIcon
                icon={["fas", "play"]}
                className="play"
                id="play"
              />
            )}
          </button>

          <button className="btn" onClick={onStop}>
            <FontAwesomeIcon
              icon={["fas", "stop"]}
              className="stop"
              id="stop"
            />
          </button>

          <input
            type="range"
            className="progress"
            id="progress"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={onSeek}
          />
          <span className="timestamp" id="timestamp">
            00:00
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default VideoPlayer;
