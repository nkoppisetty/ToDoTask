const app = module.exports = require('express')();

app.get('/', (req, res) => {
  res.send({msg: 'hello'});
});

app.use('/auth', require('./auth'));
app.use('/posts', require('./posts'));
app.use('/todos', require('./todos'));
app.use('/tags', require('./tags'));

// the catch all route
app.all('*', (req, res) => {
  console.log(`404 Not Found, ${req.path}`);
  res.status(404).send({msg: 'not found'});
});
