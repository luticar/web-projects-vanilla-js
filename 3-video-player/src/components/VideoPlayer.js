import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VideoPlayer = props => {
  return (
    <Fragment>
      <div className="container">
        <p>Custom Video Player</p>
        <video
          src="../videos/gone.mp4"
          id="video"
          className="screen"
          poster="../img/poster.png"
        ></video>
        <div className="controls">
          <FontAwesomeIcon
            icon={["fas", "play"]}
            className="controls"
            id="play"
          />
          <FontAwesomeIcon
            icon={["fas", "pause"]}
            className="controls"
            id="pause"
          />
          <FontAwesomeIcon
            icon={["fas", "stop"]}
            className="controls"
            id="stop"
          />
        </div>
        <input
          type="range"
          className="progress"
          id="progress"
          min="0"
          max="100"
          step="0.1"
          value="0"
        />
        <span className="timestamp" id="timestamp">
          00:00
        </span>
      </div>
    </Fragment>
  );
};

export default VideoPlayer;
