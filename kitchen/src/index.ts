import {orderConsumer} from "./consumer/orderConsumer"



orderConsumer.start()


process.on('exit', () => {
    orderConsumer.close();
});