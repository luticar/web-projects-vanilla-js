import React, { Fragment, useEffect, useRef, useState } from "react";

const MovieTheater = _props => {
  const container = useRef(null);
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    container.current.addEventListener("click", e => {
      if (
        e.target.classList.contains("seat") &&
        !e.target.classList.contains("occupied")
      ) {
        e.target.classList.toggle("selected");
      }
      updateCounter();
    });
  }, []);

  const updateCounter = () => {
    const selectedSeatsCount = document.querySelectorAll(".row .seat.selected")
      .length;
    setCount(selectedSeatsCount);
  };

  const onSelectMovie = e => {
    setPrice(parseInt(e.target.value));
  };

  const total = price * count;

  return (
    <Fragment>
      <div className="movie-container">
        <label htmlFor="" className="for">
          Pick a movie:
        </label>
        <select id="movie" className="movie-select" onChange={onSelectMovie}>
          <option value="10">Sonic ($10)</option>
          <option value="12">Parasite ($12)</option>
          <option value="15">1917 ($13)</option>
          <option value="13">Joker ($14)</option>
        </select>
      </div>
      <ul className="showcase">
        <li>
          <div className="seat"></div>
          <small>Available</small>
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
      <div className="container" ref={container}>
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
        You've selected <span id="count">{count}</span> seats <br />
        for the price of $<span id="total">{total}</span>
      </p>
    </Fragment>
  );
};

export default MovieTheater;
