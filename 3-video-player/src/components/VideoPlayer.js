import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import poster from "../img/freepik-poster.jpg";
import video from "../videos/gone.mp4";

const VideoPlayer = props => {
  return (
    <Fragment>
      <div className="container">
        <h1>Custom Video Player</h1>
        <div className="player">
          <video
            src={video}
            id="video"
            className="screen"
            poster={poster}
          ></video>
        </div>
        <div className="controls">
          <button className="btn">
            <FontAwesomeIcon
              icon={["fas", "play"]}
              className="play"
              id="play"
            />
          </button>
          <button className="btn">
            <FontAwesomeIcon
              icon={["fas", "pause"]}
              className="pause"
              id="pause"
            />{" "}
          </button>
          <button className="btn">
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
            value="0"
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
