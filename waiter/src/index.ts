import express, { Application } from 'express';
import { WaiterController } from "./controller/waiterController"
import { balconyConsumer } from "./consumer/balconyConsumer"
import { orderProducer } from "./producer/orderProducer"


const PORT = process.env.PORT || 3000;

const app: Application = express();
app.use(express.json());

const waiter = new WaiterController(app);
waiter.routes()

orderProducer.start()
balconyConsumer.start()

process.on('exit', () => {
    orderProducer.close()
    balconyConsumer.close();
})

app.listen(PORT, () => {
    console.log(`Waiter-${PORT} is listening at http://localhost:${PORT}`)
});


