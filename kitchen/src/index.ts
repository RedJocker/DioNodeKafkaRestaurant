import {orderConsumer} from "./consumer/orderConsumer"
import {balconyProducer} from "./producer/balconyProducer"


orderConsumer.start();
balconyProducer.start();

process.on('exit', () => {
    orderConsumer.close();
    balconyProducer.close();
});