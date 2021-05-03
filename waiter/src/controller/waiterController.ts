import { Application, Request, Response } from "express";
import { orderProducer} from "../producer/orderProducer"
import { Order } from "../model/order"
import { tracker, OrderState } from "../state/orderState"


class WaiterController {

    app: Application;
    
    constructor(app: Application) {
        this.app = app
    }

    routes():void {
        this.app.post('/order', createOrder)
    }
}

const createOrder = async (req: Request, res: Response) => {
    try {
        const {table, drinks, food} = req.body
        const order: Order = { table, drinks, food, id: `table-${req.body.table}-${Date.now()}` };
        
        if (!order.drinks?.length && !order.food?.length) {
          res.status(400).send('You must send Drinks array or Food array!');
        } else {
          tracker.set(order.id, new OrderState(order))
          await orderProducer.sendOrder(order);
          res.send(`Order ${order.id} sent!`);
        }

    } catch (error) {
        console.error(error);
        res.send(error);
    }
}

export { WaiterController }