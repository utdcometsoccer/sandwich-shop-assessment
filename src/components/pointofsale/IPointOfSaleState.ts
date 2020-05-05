import { IOrder } from "./IOrder";
import { ISandwich } from "./ISandwich";

export interface IPointOfSaleState{
    selectedSandWich?: ISandwich;
    selectedOrders?:number[];
    quantity: number; 
    sandwiches: ISandwich[]
    orders:IOrder[];
}