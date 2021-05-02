import express, { Application } from 'express';
import { WaiterController } from "./controller/waiterController"
import { OrderProducer } from "./producer/orderProducer"
import { resolve } from 'path';
import { Producer } from 'node-rdkafka';

const PORT = process.env.PORT || 3000;

const app: Application = express();
app.use(express.json());

const waiter = new WaiterController(app);
waiter.routes()

const orderProducer = new Promise<OrderProducer>( (res, rej) => {
    res(new OrderProducer())
}) 

orderProducer.then( producer => { producer.start(); return producer})
    .then(producer => producer.sendTest())
    .catch(() => console.log("kafka test failed to produce message")) 

    
app.listen(PORT, () => {
    console.log(`Waiter-${PORT} is listening at http://localhost:${PORT}`)
});


process.on('exit', () => {
    orderProducer.then( producer => producer.close())
})