#!/bin/bash

docker exec -it kafka-restaurant /bin/kafka-console-consumer --from-beginning --topic balcony --bootstrap-server localhost:9092