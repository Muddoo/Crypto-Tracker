import React, { useEffect, useState, useContext, useRef } from "react";
import coinGecko from "../apis/coinGecko";
import { WatchListContext } from "../context/watchListContext";
import Coin from "./Coin";

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const { watchList, deleteCoin } = useContext(WatchListContext);
  const [isLoading, setIsLoading] = useState(false);
  const [allCoins, setAll] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      !watchList.length && setIsLoading(true);
      const response = await coinGecko.get("/coins/markets/", {
        params: {
          vs_currency: "usd",
        },
      });
      
      const resObject = response.data.reduce((obj,d) => ({...obj, [d.id]: d}), {})
      setAll(resObject);
      setIsLoading(false);
    };

    fetchData();
    
  }, []);

  useEffect(() => {
    if(Object.keys(allCoins).length) {
      const newWatchList = watchList.map(coin => allCoins[coin]);
      (newWatchList.length) ? setCoins(newWatchList) : setCoins(Object.values(allCoins))
    }
  }, [watchList, allCoins])

  const renderCoins = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <ul className="coinlist list-group mt-2">
        {coins.map((coin) => {
          return <Coin key={coin.id} coin={coin} deleteCoin={deleteCoin} watchList={watchList} />;
        })}
      </ul>
    );
  };

  return <div>{renderCoins()}</div>;
};

export default CoinList;
