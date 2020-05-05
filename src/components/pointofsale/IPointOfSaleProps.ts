import { IOrder } from "./IOrder";
export interface IPointOfSaleProps{    
    orderCalculatorFunc:(orders:IOrder[])=>number;
}