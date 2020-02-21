import React, { Fragment } from "react";

const MovieTheater = props => {
  return (
    <Fragment>
      <div className="App">
        <div className="movie-container">
          <label htmlFor="" className="for">
            Pick a movie:
          </label>
          <select id="movie">
            <option value="10">Sonic ($10)</option>
            <option value="12">Parasite ($12)</option>
            <option value="15">1917 ($13)</option>
            <option value="13">Joker ($14)</option>
          </select>
        </div>
        <ul className="showcase">
          <li>
            <div className="seat"></div>
            <small>N/A</small>
          </li>
          <li>
            <div className="seat selected"></div>
            <small>Selected</small>
          </li>
          <li>
            <div className="seat occupied"></div>
            <small>Occupied</small>
          </li>
        </ul>
        <div className="container">
          <div className="screen"></div>
          <div className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat occupied"></div>
            <div className="seat occupied"></div>
            <div className="seat occupied"></div>
            <div className="seat occupied"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <div className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat occupied"></div>
            <div className="seat occupied"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <div className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat occupied"></div>
            <div className="seat occupied"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <div className="row aisle">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat occupied"></div>
            <div className="seat occupied"></div>
          </div>
          <div className="row">
            <div className="seat occupied"></div>
            <div className="seat occupied"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <div className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat occupied"></div>
            <div className="seat occupied"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
        </div>
        <p className="text">
          You've selected <span id="count">0</span> seats for the price of $
          <span id="total">0</span>
        </p>
      </div>
    </Fragment>
  );
};

export default MovieTheater;
