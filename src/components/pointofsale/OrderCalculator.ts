import { IOrder } from "./IOrder";

export function OrderCost(order:IOrder):number{
    return order.quantity * order.sandwich.cost;
}
export function OrderCalculator(orders:IOrder[]): number{
    let total = 0;
    for(let i = 0; i < orders.length; i++){
        total += OrderCost(orders[i]);
    }
    return total;
}