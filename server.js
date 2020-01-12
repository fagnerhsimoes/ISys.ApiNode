const express    = require("express");
const mongoose   = require("mongoose");  
const bodyParser = require("body-parser");
const passport   = require("passport");
const users      = require("./src/routes/api/users");
const vendors    = require("./src/routes/api/vendors/index");
const app        = express();
const cors       = require('cors');

app.use(cors());
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Max-Age", "3600");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});

app.use(bodyParser.urlencoded({extended: true}));             
app.use(bodyParser.json());                                   
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(express.static(__dirname + '/public'));                
app.use('/public/uploads',express.static(__dirname + '/public/uploads'));

const db = require("./src/config/keys").mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true , useUnifiedTopology: true}
  )
  .then(() => console.log("mongo successfully connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require("./src/config/passport")(passport);

app.use("/v1/auth"   ,    users);
app.use("/v1/vendors",    vendors);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
