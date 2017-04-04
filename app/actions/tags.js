const shape = require('shape-errors');
const {isString} = require('lodash');
const {table, scoper} = require('app/orm');

function createTag(user, data={}) {
  return shape({
    name: (name) => isString(name) && name.length > 0 ? null : 'invalid'
  }).errors(data).then((err) => err ? (
    Promise.reject(err)
  ) : (
    table('tags').insert({
      ...data,
      user_id: user.id
    })
  ));
}

function getTags(params={}) {
  const t = table('tags').orderBy('created_at', 'desc');
  return scoper({}).apply(t, params).all();
}

function updateTag(tag, data={}) {
  return shape({
    name: (name) => isString(name) && name.length > 0 ? null : 'invalid'
  }).errors(data).then((err) => err ? (
    Promise.reject(err)
  ) : (
    table('tags').update(tag.id, data)
  ));
}

function deleteTag(tag) {
  return table('tags').delete(tag.id);
}

function findTagById(id) {
  return table('tags').find(id);
}

module.exports = {
  createTag,
  updateTag,
  deleteTag,
  findTagById,
  getTags
};
