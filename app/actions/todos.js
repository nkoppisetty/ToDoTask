const shape = require('shape-errors');
const {isString} = require('lodash');
const {table, scoper} = require('app/orm');

function createToDo(user, data={}) {
  return shape({
    title: (title) => isString(title) && title.length > 0 ? null : 'invalid',
    text: (text) => isString(text) && text.length > 0 ? null : 'invalid'
  }).errors(data).then((err) => err ? (
    Promise.reject(err)
  ) : (
    table('todos').insert({
      ...data,
      user_id: user.id
    })
  ));
}

function getToDos(params={}) {
  const t = table('todos').orderBy('created_at', 'desc');
  return scoper({}).apply(t, params).all();
}

function updateToDo(todo, data={}) {
  return shape({
    title: (title) => isString(title) && title.length > 0 ? null : 'invalid',
    text: (text) => isString(text) && text.length > 0 ? null : 'invalid'
  }).errors(data).then((err) => err ? (
    Promise.reject(err)
  ) : (
    table('todos').update(todo.id, data)
  ));
}

function deleteToDo(todo) {
  return table('todos').delete(todo.id);
}

function findToDoById(id) {
  return table('todos').find(id);
}

module.exports = {
  createToDo,
  updateToDo,
  deleteToDo,
  findToDoById,
  getToDos
};
