import React, { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const [watchList, setWatchList] = useState(
    JSON.parse(localStorage.getItem("watchList")) || []
  );

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  const deleteCoin = (coin) => {
    setWatchList(
      watchList.filter((el) => {
        return el !== coin;
      })
    );
  };

  const addCoin = (coin) => {
    if (watchList.indexOf(coin) === -1) {
      setWatchList([...watchList, coin]);
    }
  };

  return (
    <WatchListContext.Provider value={{ watchList, deleteCoin, addCoin }}>
      {props.children}
    </WatchListContext.Provider>
  );
};
