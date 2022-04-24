import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const initInput = {
    weight: 0,
    pin: 0,
    deliveryType: "forward",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [courierCharge, setCourierCharge] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [input, setInput] = useState(initInput);
  const handleChange = (e) => {
    const nam = e.target.name;
    const valu = e.target.value;
    setInput({ ...input, [nam]: valu });
  };
  const fetchData = () => {
    console.log("fetchData");
    if (input.pin.length != 6) {
      alert("Incorrect PIN, PIN should be 6 digits");
      return;
    } else {
      getCourierCharge();
    }
    setErrorMessage(null);
    setIsLoading(true);
    setCourierCharge(null);
    async function getCourierCharge() {
      const deliveryType = input.deliveryType;
      const pin = input.pin;
      const weight = input.weight;
      const response = await fetch(
        `https://cointab-backend2.herokuapp.com/${deliveryType}/${pin}/${weight}`
      );
      const data = await response.json();
      console.log(data);
      if (data.totalCost) {
        setCourierCharge(data.totalCost);
      } else {
        setErrorMessage(data.error);
      }
      setIsLoading(false);
    }
  };
  return (
    <div className="App">
      <div className="inputElements">
        <label>Weight:</label>
        <input
          type="number"
          placeholder="Weight of product"
          name="weight"
          onChange={handleChange}
        />
        <br />
        <label>Pincode:</label>
        <input
          type="number"
          placeholder="customer pincode"
          name="pin"
          onChange={handleChange}
        />
        <br />
        <label>Delivery type</label>
        <select name="deliveryType" onChange={handleChange}>
          <option value="forward">Forward</option>
          <option value="rto">Forward & RTO</option>
        </select>
        <br />
        <input type="button" value="check courier charge" onClick={fetchData} />
      </div>
      {isLoading && <div className="loading">GETTING THE COST</div>}
      {courierCharge && (
        <div className="outputElem">
          <h4>COURIER CHARGE Rs.{courierCharge}</h4>
        </div>
      )}
      {errorMessage && (
        <div className="error">
          <h4>{errorMessage}</h4>
        </div>
      )}
    </div>
  );
};
export default App;
