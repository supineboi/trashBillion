const express = require('express');
const indexRouter = require('./routes/index');
const sellRouter = require('./routes/sell');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
// No neeed as it will automatically set to 'views'
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/sell', sellRouter);
app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});