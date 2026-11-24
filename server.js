const express = require('express');
const indexRouter = require('./routes/index');
const trashRoutes = require('./routes/trash');
const userRoutes = require('./routes/user')
const path = require('path');
const { notFoundPage } = require('./controllers/error');
const initializeModels = require('./models');

const app = express();

app.set('view engine', 'pug');
// No neeed as it will automatically set to 'views'
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, "public")));

initializeModels();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/trash', trashRoutes);
app.use('/user', userRoutes)
app.use('/', indexRouter);
app.use(notFoundPage)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});