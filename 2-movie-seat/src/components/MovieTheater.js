import React, { Fragment, useEffect, useRef, useState } from "react";

const PREOCCUPIED = [3, 4, 10, 20];

const MovieTheater = _props => {
  const container = useRef(null);
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [seats, setSeats] = useState(new Array(6 * 12).fill(null));

  useEffect(() => {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    setSeats(seats =>
      seats.map((seat, index) => {
        if (PREOCCUPIED.indexOf(index) > -1) return "occupied";
        if (selectedSeats.indexOf(index) > -1) return "selected";
        return seat;
      })
    );
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  }, []);

  useEffect(() => {
    let seatsIndex = [];
    seats.forEach((s, i) => {
      if (s === "selected") {
        seatsIndex.push(i);
      }
    });
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
    updateCounter();
  }, [seats]);

  const pickSeat = idx => {
    setSeats(
      seats.map((s, i) => {
        if (i === idx && s === "selected") return null;
        if (i === idx && s !== "occupied") return "selected";
        return s;
      })
    );
  };

  const updateCounter = () => {
    const selectedSeatsCount = seats.filter(s => s === "selected").length;
    setCount(selectedSeatsCount);
  };

  const onSelectMovie = e => {
    const { value, selectedIndex } = e.target;
    setPrice(parseInt(value));
    setMovieData(selectedIndex, value);
  };
  //Storage selected movie and its price
  const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
  };

  const total = price * count;

  const renderRow = row =>
    seats.slice(row * 12, (row + 1) * 12).map((seat, i) => {
      const idx = row * 12 + i;

      return (
        <div
          className={`seat ${seat}`}
          data-index={idx}
          key={`seat-${idx}`}
          onClick={() => pickSeat(idx)}
        ></div>
      );
    });

  return (
    <Fragment>
      <div className="movie-container">
        <label htmlFor="" className="for">
          Pick a movie:
        </label>
        <select id="movie" className="movie-select" onChange={onSelectMovie}>
          <option value="0">Select a movie</option>
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

        {new Array(6).fill(null).map((_, index) => (
          <div
            className={`row ${index === 3 ? "aisle" : ""}`}
            key={`row-${index}`}
          >
            {renderRow(index)}
          </div>
        ))}
      </div>
      <p className="text">
        You've selected <span id="count">{count}</span> seats <br />
        for the price of $<span id="total">{total}</span>
      </p>
    </Fragment>
  );
};

export default MovieTheater;
