import { Producer, ProducerGlobalConfig} from 'node-rdkafka';


class OrderProducer extends Producer {
    constructor() {
      const config: ProducerGlobalConfig = process.env.KAFKA_PASSWORD
        ? {
          'metadata.broker.list': process.env.KAFKA_BROKER_URI || 'localhost:9092',
          'dr_cb': true,
          'sasl.username': process.env.KAFKA_USERNAME,
          'sasl.password': process.env.KAFKA_PASSWORD,
          'sasl.mechanisms': 'SCRAM-SHA-256',
          'socket.keepalive.enable': true,
          'debug': 'generic,broker,security',
          'security.protocol': 'sasl_ssl',
        }
        : {
          'metadata.broker.list': process.env.KAFKA_BROKER_URI || 'localhost:9092',
          'dr_cb': true,
        };
      super(config, {});
      super
        .on('ready', () => console.log('Started OrderProducer'))
        .on('event.error', (error) => { throw error });
    }
  
    start() {
      super.connect();
      super.on('ready', () => console.log("connected to kafka"))
    }
  
    close() {
      super.disconnect();
    }

    async sendTest() {
        if(super.isConnected()) {
            try {
                super.produce(`${process.env.KAFKA_TOPIC_PREFIX || ''}order`, null, Buffer.from(JSON.stringify({test: "test"}))); 
                console.log("message test produced");
            } catch (error) {
                console.log(error.message)
            } 
        } else {
            console.log("producer is not connected, trying to send message again in 1 second")
            setTimeout(() => this.sendTest(), 1000)
        }  
    }
  
    
}

export { OrderProducer }