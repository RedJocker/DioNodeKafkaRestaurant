import express, { Application } from 'express';
import { DeliveryController } from "./controller/deliveryController"
import { balconyConsumer } from "./consumer/balconyConsumer"
import { orderProducer } from "./producer/orderProducer"


const PORT = process.env.PORT || 3001;

const app: Application = express();
app.use(express.json());

const waiter = new DeliveryController(app);
waiter.routes()

orderProducer.start()
balconyConsumer.start()

process.on('exit', () => {
    orderProducer.close()
    balconyConsumer.close();
})

app.listen(PORT, () => {
    console.log(`Delivery-${PORT} is listening at http://localhost:${PORT}`)
});


