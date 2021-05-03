import { KafkaConsumer, ConsumerGlobalConfig } from 'node-rdkafka';
import { tracker } from "../state/orderState"
import { Order } from "../model/order"

const TOPIC_NAME = 'balcony';
const GROUP_ID = 'Waiter';

class BalconyConsumer extends KafkaConsumer {



  constructor() {
    const config: ConsumerGlobalConfig = process.env.KAFKA_PASSWORD
      ? {
        'group.id': GROUP_ID,
        'metadata.broker.list': process.env.KAFKA_BROKER_URI || 'localhost:9092',
        'sasl.username': process.env.KAFKA_USERNAME,
        'sasl.password': process.env.KAFKA_PASSWORD,
        'sasl.mechanisms': 'SCRAM-SHA-256',
        'socket.keepalive.enable': true,
        'debug': 'generic,broker,security',
        'security.protocol': 'sasl_ssl',
      }
      : {
        'group.id': GROUP_ID,
        'metadata.broker.list': process.env.KAFKA_BROKER_URI || 'localhost:9092',
      };
    super(config, {});


    const topicName = `${process.env.KAFKA_TOPIC_PREFIX || ''}${TOPIC_NAME}`;

    super.on('ready', () => {
            super.subscribe([topicName]);
            super.consume();
            console.log(`Started ${GROUP_ID} consumer on topic ${topicName}`);
        })
        .on('rebalance', () => console.log(`Rebalancing ${GROUP_ID} Consumers...`))
        .on('data', ({ value }) => {
            const { id, food, drinks } = JSON.parse(value.toString()) as Order ;
            const orderTracker = tracker.get(id)

            if(food) {
                orderTracker.setFoodReady()
            }
            if(drinks) {
                orderTracker.setDrinksReady()
            }

        }).on('event.error', (error) => { throw error });
    }

    start() {
        super.connect();
    }

    close() {
        super.disconnect();
    }

}


const balconyConsumer = new BalconyConsumer()

export { balconyConsumer }