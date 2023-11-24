const express = require('express');
const bodyParser = require('body-parser');
const Producer = require('./producer');

const producer = new Producer();

const app = express();
app.use(bodyParser.json())


app.post('/sendLog', async (req, res) => {
    await producer.publishMessage(req.body.logType, req.body.message);
    // just for body check
    res.send(req.body);
})


app.listen(3000, () => {
    console.log('Logger server started on PORT: 3000')
})