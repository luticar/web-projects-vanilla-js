import React, { Fragment, useEffect, useRef, useState } from "react";

const PREOCCUPIED = [3, 4, 10, 36, 37];

const MOVIES = [
  { id: 1, price: 10, name: "Sonic ($10)" },
  { id: 2, price: 12, name: "Parasite ($12)" },
  { id: 3, price: 13, name: "1917 ($13)" },
  { id: 4, price: 14, name: "Joker ($14)" }
];

const MovieTheater = _props => {
  const container = useRef(null);
  const [count, setCount] = useState(0);
  const [seats, setSeats] = useState(new Array(6 * 12).fill(null));
  const [movie, setMovie] = useState("");

  useEffect(() => {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    setSeats(seats =>
      seats.map((seat, index) => {
        if (PREOCCUPIED.indexOf(index) > -1) return "occupied";
        if (selectedSeats.indexOf(index) > -1) return "selected";
        return seat;
      })
    );
    const movieId = localStorage.getItem("selectedMovie");
    const movie = MOVIES.find(m => m.id == movieId);
    setMovie(movie);
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
    const movie = MOVIES.find(m => m.id == e.target.value);
    setMovie(movie);
    localStorage.setItem("selectedMovie", movie.id);
  };

  const price = movie ? movie.price : 0;
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
        <select
          id="movie"
          className="movie-select"
          onChange={onSelectMovie}
          value={movie.id}
        >
          <option value="">Select a movie</option>
          {MOVIES.map(movie => (
            <option value={movie.id} key={`movie-${movie.id}`}>
              {movie.name}
            </option>
          ))}
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
