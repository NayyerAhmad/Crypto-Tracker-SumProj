import React, {userSrare, useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Coin'
import logo from './logo.svg'
import { Route, BrowserRouter as Router} from "react-router-dom"

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(response => {
      setCoins(response.data);
    }).catch(error => console.log(error));}, []);

    const handleChange = e => {
      setSearch(e.target.value)
    }

    const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className='coin-app'>
      <div className="coin-search">
        <img src={logo} width = "100" />
          <h1 className="coin-text">Search a currency</h1>
          <form>
            <input type="text" className="coin-input" placeholder="Search" onChange={handleChange}/>
          </form>
      </div>
      {filteredCoins.map(coin => {
        return (
        <Coin
          key={coin.id}
          name={coin.name}
          image={coin.image}
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;
