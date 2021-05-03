# DioNodeKafkaRestaurant
Restaurant(microservices) app using Node and Kafka


Neste projeto construimos um aplicativo que gerencia pedidos de um restaurante utilizando arquitetura de microsserviços em Typescript usando express e node-rdkafka.  


O aplicativo waiter e o aplicativo delivery recebem pedidos via post e mandam via kafka para a cozinha.    
A cozinha possui dois tipos Cook, que processa os itens de comida do pedido, e Bartender, que processa os itens de bebida.  
Da cozinha o pedido retorna a quem o pediu via kafka.  


o projeto conta com um docker-compose para rodar o kafka e cada um de seu modulos pode ser iniciado, do terminal se localizando na pasta do respectivo modulo,
com o comando 'npm run dev'.
O modulo kitchen deve ser precedido com a variavel de ambiente CONSUMER_TYPE, os valores aceitos são Cook ou Bartender.  
O comando para rodar um bartender seria então 'CONSUMER_TYPE=Bartender npm run dev'. 
O sistema completo contem um waiter, um kitchen(Cook), um kitchen(Bartender) e um delivery, além do kafka.

