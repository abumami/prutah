import React, { useState, useEffect } from 'react';
//import logo from './logo.svg';
import './App.css';
import { convertCurrency } from './convert';
import useDropdown from './useDropdown.jsx';

var currencies =
  [
    {
      currency: "ILS",
      symbol: "₪"
    },
    {
      currency: "USD",
      symbol: "$"
    },
    {
      currency: "GBP",
      symbol: "£"
    },
    {
      currency: "EUR",
      symbol: "€"
    },
    {
      currency: "CAD",
      symbol: "$"
    }
  ];

const App = () => {

  const [data, setData] = useState(0);
  const [symbol, setSymbol] = useState(0);

  const currencyOptions = currencies.map(({ currency, symbol }) => (
    { key: currency, value: currency, label: symbol + ' ' + currency }
  ))

  const [currency, Currencies] = useDropdown("", "ILS", currencyOptions);

  useEffect(() => {
    let selected = currencies.find(x => x.currency === currency);
    convertCurrency(1, 'XAG', selected.currency, function (err, amount) {
      let val = Math.ceil((amount * 0.00080377) * 10000) / 10000
      setData(val);
      setSymbol(selected.symbol);
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>
          שווה פרוטה
        </p>

      </header>

      <body className="App-body">

        <div className="App">
          <p> <Currencies /> {symbol} {data}</p>

        </div>
      </body>
    </div>

  );
}

export default App;
