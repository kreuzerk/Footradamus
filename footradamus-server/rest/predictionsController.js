let express = require('express');
let bodyParser = require('body-parser');
let cors = require('express-cors');
let fs = require('fs');
//let predictions = require('./predictions.json').predictions;
let predictionsModel = require('./db.js').Predictions;

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors({
    allowedOrigins: [
        'localhost:4200'
    ]
}));

app.get('/predictions', (request, response) => {
  predictionsModel.find({}, (error, predictions) => {
    response.setHeader('Content-Type', 'application/json');
    response.send(predictions);
  });
});

app.put('/predictions/:id', (request, response) => {
    let id = request.params.id;
    predictionsModel.findOneAndUpdate({_id: id}, request.body, (error, prediciton) => {
      if (!error) {
          response.setHeader('Content-Type', 'application/json');
          response.send(request.body);
      } else {
          response.status(404).send(`Unfortunatley no prediction with id ${id} was found`);
      }
    });
});

app.post('/predictions', (request, response) => {
    let newPrediction = request.body;
    predictionsModel.create(newPrediction);
    response.setHeader('Content-Type', 'application/json');
    response.send(newPrediction);
});

app.delete('/predictions/:id', (request, response) => {
    let id = request.params.id;
    predictionsModel.findOneAndRemove({_id: id}, (error, deletedPrediction) => {
      if (!error) {
          response.setHeader('Content-Type', 'application/json');
          response.send(deletedPrediction);
      } else {
          response.status(404).send(`Unfortunatley no prediction with id ${id} was found`);
      }
    });
});

app.listen(3004, () => console.log('Server is up and running'));
