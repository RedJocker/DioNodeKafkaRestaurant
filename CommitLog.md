
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
