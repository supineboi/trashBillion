const express = require('express');
const indexRouter = require('./routes/index');
const sellRouter = require('./routes/sell');
const userRouter = require('./routes/user')
const path = require('path');
const { notFoundPage } = require('./controllers/error');

const app = express();

app.set('view engine', 'pug');
// No neeed as it will automatically set to 'views'
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
    console.log("Requested URL:", req.url);
    next();
});

const fs = require('fs');

const jsPath = path.join(
    __dirname,
    'public',
    'js',
    'layouts',
    'error-modal.js'
);

console.log('Server directory:', __dirname);
console.log('JS file path:', jsPath);
console.log('File exists:', fs.existsSync(jsPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/sell', sellRouter);
app.use('/user', userRouter)
app.use('/', indexRouter);
app.use(notFoundPage)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});