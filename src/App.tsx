import * as React from "react";
import "./App.css";
import { OrderCalculator } from "./components/pointofsale/OrderCalculator";
import PointOfSale from "./components/pointofsale";

export default class App extends React.Component {
  public render(): React.ReactNode {
    return (
      <div className="App">
        <div>
          <PointOfSale orderCalculatorFunc={OrderCalculator} />
        </div>
      </div>
    );
  }
}
