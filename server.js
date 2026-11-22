const express = require('express');
const indexRouter = require('./routes/index');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});