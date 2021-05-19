import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { WatchListContext } from "../context/watchListContext";

const AddCoin = () => {
  const [isActive, setIsActive] = useState(false);
  const { addCoin } = useContext(WatchListContext);
  const availableCoins = [
    "bitcoin",
    "ethereum",
    "ripple",
    "tether",
    "bitcoin-cash",
    "litecoin",
    "eos",
    "okb",
    "tezos",
    "cardano",
  ];

  const handleClick = (coin) => {
    addCoin(coin);
    setIsActive(false);
  };

  return (
    <div className="dropdown">
      <button
        onClick={() => setIsActive(!isActive)}
        className="btn btn-primary dropdown-toggle"
        type="button"
      >
        Add Coin
      </button>
      <div className={isActive ? "dropdown-menu show" : "dropdown-menu"}>
        {availableCoins.map((el,i) => {
          return (
            <Link
              key={i}
              onClick={() => handleClick(el)}
              to="/"
              className="dropdown-item"
            >
              {el}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AddCoin;
