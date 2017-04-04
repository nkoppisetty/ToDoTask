const app = module.exports = require('express')();

const {loggedIn} = require('app/filters').auth;

const {createToDo, updateToDo,
  deleteToDo, findToDoById, getToDos} = require('app/actions').todos;

app.post('/create', loggedIn, (req, res) => {
  createToDo(req.user, req.body)
    .then((todo) => res.send({todo}))
    .catch((err) => {
      console.log(err);
      res.status(400).send({msg: 'failed'});
    })
  ;
});

app.get('/read', loggedIn, (req, res) => {
  getToDos(req.query).then((todo) => res.send({todo}));
});

app.put('/update/:todoId', loggedIn, (req, res) => {
  findToDoById(req.params.todoId).then((todo) => {
    if (todo) {
      updateToDo(todo, req.body)
          .then((todo) => res.send({todo}))
          .catch((err) => {
            console.log(err);
            res.status(400).send(err);
          });
    } else {
      res.status(404).send({msg: 'not found'});
    }
  });
});

app.delete('/delete/:todoId', loggedIn, (req, res) => {
  findToDoById(req.params.todoId).then((todo) => {
    if (todo) {
      deleteToDo(todo)
          .then(() => res.send({msg: 'done'}))
          .catch((err) => {
            console.log(err);
            res.status(400).send(err);
          });
    } else {
      res.status(404).send({msg: 'not found'});
    }
  });
});
