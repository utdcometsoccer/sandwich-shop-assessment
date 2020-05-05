import * as React from "react";
import { IPointOfSaleProps } from "./IPointOfSaleProps";
import { IPointOfSaleState } from "./IPointOfSaleState";
import { ISandwich } from "./ISandwich";
import { IOrder } from "./IOrder";

export default class PointOfSale extends React.Component<
  IPointOfSaleProps,
  IPointOfSaleState
> {
  private selecthandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  private quantityHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  private plusButtonHandler: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  private minusButtonHandler: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  private submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
  private orderSelecthandler: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;

  constructor(props: IPointOfSaleProps) {
    super(props);
    this.state = {
      sandwiches: [
        { cost: 3, name: "Peanut butter and Jelly" },
        { cost: 6, name: "Ham and Cheese" },
        { cost: 9, name: "Philly Steak" },
        { cost: 10, name: "Hamburger" },
        { cost: 8, name: "BLT" },
      ],
      orders: [],
      quantity: 0,
    };
    this.selecthandler = this.sandwichSelected.bind(this);
    this.quantityHandler = this.quantityChanged.bind(this);
    this.plusButtonHandler = this.plusButtonClick.bind(this);
    this.minusButtonHandler = this.minusButtonClick.bind(this);
    this.submitHandler = this.formSubmit.bind(this);
    this.orderSelecthandler = this.ordersSelected.bind(this);
  }
  private sandwichSelected(event: React.ChangeEvent<HTMLSelectElement>): void {
    const { sandwiches } = this.state;
    const selectedValue = event.target.value;
    const selectedSandwich = sandwiches.filter(
      (sandwich: ISandwich) => sandwich.name === selectedValue
    )[0];
    this.setState({ selectedSandWich: selectedSandwich });
  }

  private ordersSelected(event: React.ChangeEvent<HTMLSelectElement>): void {
    const selectedOptions = Array.prototype.slice.call( event.target.selectedOptions);
    const indices = selectedOptions.map((option:HTMLOptionElement)=>Number.parseInt(option.value));
    this.setState({ selectedOrders: indices});
  }
  private quantityChanged(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ quantity: event.target.valueAsNumber });
  }

  private plusButtonClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    const { orders, selectedSandWich, quantity } = this.state;
    if (selectedSandWich) {
      const newOrder = { sandwich: selectedSandWich, quantity: quantity };
      const newOrders = orders.slice();
      newOrders.push(newOrder);
      this.setState({ orders: newOrders });
    }
  }
  private minusButtonClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    const { selectedOrders, orders } = this.state;
    if (selectedOrders) {
      
      const newOrders = orders.slice();
      // reverse order
      for(var i = selectedOrders.length-1; i>=0; i--){
          newOrders.splice(selectedOrders[i], 1);
      }
      this.setState({ orders: newOrders });
    }
  }

  private formSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    alert("Thank you for your order!");
  }
  public render(): React.ReactNode {
    const { orderCalculatorFunc } = this.props;
    const { sandwiches, orders } = this.state;
    return (
      <form onSubmit={this.submitHandler}>
        <fieldset>
          <legend>Sandwiches</legend>
          <div>
            <select onChange={this.selecthandler}>
              {sandwiches.map((sandwich: ISandwich, index: number) => (
                <option value={sandwich.name} key={`sandwich${index}`}>
                  {sandwich.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="quantity">Quantity</label>{" "}
            <input
              id="quantity"
              type={"number"}
              onChange={this.quantityHandler}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Orders</legend>
          <div className="order-plus">
            <button type={"button"} onClick={this.plusButtonHandler}>
              +
            </button>{" "}
            <button type={"button"} onClick={this.minusButtonHandler}>-</button>
          </div>
          <select multiple={true} onChange={this.orderSelecthandler}>
            {orders.map((order: IOrder, index: number) => (
              <option
                key={`order${index}`}
                value={index}
              >{`${order.quantity} ${order.sandwich.name} sandwich(es)`}</option>
            ))}
          </select>
        </fieldset>
        <fieldset>
          <legend>Total</legend>
          <label htmlFor={"total"}>Cost</label>
          <output id={"total"}>${orderCalculatorFunc(orders)}</output>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
