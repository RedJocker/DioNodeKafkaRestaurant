#!/bin/bash

docker exec -it kafka-restaurant /bin/kafka-console-consumer --from-beginning --topic deliveryBalcony --bootstrap-server localhost:9092