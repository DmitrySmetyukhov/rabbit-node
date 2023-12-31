const amqp = require('amqplib');
const config = require('../config');

//step 1 : Connect to the rabbitmq server
//step 2 : Create a new channel
//step 3 : Create the exchange
//step 4 : Create the queue
//step 5 : Bind the queue to the exchange
//step 6 : Consume messages from the queue

async function consumeMessages() {
    const connection = await amqp.connect(config.rabbitMQ.url);
    const channel = await connection.createChannel();

    await channel.assertExchange(config.rabbitMQ.exchangeName, "direct");

    const q = await channel.assertQueue("WarningAndErrorsQueue");

    await channel.bindQueue(q.queue, config.rabbitMQ.exchangeName, "Warning");
    await channel.bindQueue(q.queue, config.rabbitMQ.exchangeName, "Error")

    channel.consume(q.queue, message => {
        const data = JSON.parse(message.content);
        console.log(data, 'data**')
        channel.ack(message)
    })
}

consumeMessages();