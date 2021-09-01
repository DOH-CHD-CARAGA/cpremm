const express    = require('express');
const mongoose   = require('mongoose');
// const mongoose2  = require('mongoose');
const bodyParser = require('body-parser');
const path       = require('path');
const socket     = require('socket.io');

// const driver             = require('./routes/api/driver');

//=================~import route~=================
const vasReport = require('./routes/api/vasReport');
const vaccinationSites = require('./routes/api/vaccinationSites');
const healthFacility = require('./routes/api/healthFacility');
const hfPersonnel = require('./routes/api/hfPersonnel');
const log  = require('./routes/api/log');
const user = require('./routes/api/user');
const role = require('./routes/api/role');
const office = require('./routes/api/office');
const record = require('./routes/api/record');
const record2 = require('./routes/api/record2');
const device = require('./routes/api/device');
const userComment = require('./routes/api/userComment');
const appModule = require('./routes/api/appModule');
const jobOrderRequest = require('./routes/api/jobOrderRequest');
const sample = require('./routes/api/sampleRoute');

    // "dev": "concurrently \"npm run server\" \"npm run client\""

const app = express();


// Bodyparser Middleware
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");


  next();
});



// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log(`MongoDB Connected...${db}`))
  .catch(err => console.log(err));

  require('./models/Role');
  // Connect to Mongo
  //
  // const db2 = require('./config/keys').mongoURI2;
  // mongoose2
  //   .connect(db2, { useNewUrlParser: true })
  //   .then(() => console.log(`MongoDB Connected...${db2}`))
  //   .catch(err => console.log(err));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

var server = app.listen(port, () => console.log(`Server started on port ${port}`));

var io = socket(server, { pingInterval: port });


io.of('admin').on('connection', function (socket) {
  console.log('admin connected');
});

// app.use(express.bodyParser({limit: '50mb'}));

app.use(function (req, res, next) {
  req.io = io;

  next();
})

app.use('/images/users',express.static(__dirname + '/public/images/users'));
//=================~use route~=================
app.use('/api/ceir/vaccination-sites', vaccinationSites);
app.use('/api/hf-personnel', hfPersonnel);
app.use('/api/ceir/vas-report', vasReport);
app.use('/api/ceir/health-facility', healthFacility);
app.use('/api/log', log);
app.use('/api/user', user);
app.use('/api/role', role);
app.use('/api/office', office);
app.use('/api/record', record);
app.use('/api/record2', record2);
app.use('/api/device', device);
app.use('/api/userComment',userComment);
app.use('/api/jobOrderRequest',jobOrderRequest);
app.use('/api/admin/appModule', appModule);
app.use('/api/sample', sample);


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
