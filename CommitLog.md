
- created waiter project
    - created folder waiter
    - npm init
        - enter on all
    - copied tsconfig.json
    - created .gitignore
        - node_modules
        - .DS_Store
    - created and ran initialPackages.sh
<br>

- init express server (forgot to commit at this point, included in next)
    - added scripts on package.json
    - created and run addedPackages1.sh
        - express
        - node-rdkafka
    - created src/index.ts
        - wrote express server entrypoint
<br>

- create one test endpoint
    - added waiterController.ts
        - created a POST endpoint
            - just sending an 'OK' back to test
<br>

- create kafka topic
    - added orderProducer.ts
        - sendTest
    - created docker-compose.yml
        - kafka
        - zookeper
    - docker compose up
    - created console-kafka-consumer.sh
    - test message produced 
        - produced by waiter and consumed by console-consumer
<br>

- create kafka topic through POST
    - removed test logic
    - made OrderProducer a singleton
    - created orderProducer.sendOrder(order: Order)
    - created Order interface
    - changed waiterController POST
    - manual tests seem fine
        - accepts orders with both drinks and food and create topic 
        - accepts orders with only food or only drink and create topic
        - don't accept order without food and drinks and does not create topic
<br>

- created kitchen project
    - created folder kitchen
    - npm init
        - enter on all
    - copied tsconfig.json
    - created and ran initialPackages.sh
    - created and ran addedPackages1.sh
<br>

- consume order topic
    - created oderConsumer.ts
        - tested with hardcoded type (Bartender and Cook)
        - reads new orders succesfully
            - Cook read only food
            - Bartender read only drinks

- produce topic delivery and balcony
    - updated oderConsumer.ts to rreceive type as env
    - created balconyProducer.ts
    - created 2 new console consumers
        - console-kafka-consumer-balcony.sh
        - console-kafka-consumer-delivery.sh
    - ran console consumers, order, balcony, delivery
    - ran waiter, kitchen(Cook), kitchen(Bartender)
    - tested POST
        - when have table produces balcony topic
        - when have addres produces delivery
        - when have both produces balcony topic

