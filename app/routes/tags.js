const app = module.exports = require('express')();

const {loggedIn} = require('app/filters').auth;

const {createTag, updateTag,
  deleteTag, findTagById, getTags} = require('app/actions').tags;

app.post('/create', loggedIn, (req, res) => {
  createTag(req.user, req.body)
    .then((tag) => res.send({tag}))
    .catch((err) => {
      console.log(err);
      res.status(400).send({msg: 'failed'});
    })
  ;
});

app.get('/read', loggedIn, (req, res) => {
  getTags(req.query).then((tag) => res.send({tag}));
});

app.put('/update/:tagId', loggedIn, (req, res) => {
  findTagById(req.params.tagId).then((tag) => {
    if (tag) {
      updateTag(tag, req.body)
          .then((tag) => res.send({tag}))
          .catch((err) => {
            console.log(err);
            res.status(400).send(err);
          });
    } else {
      res.status(404).send({msg: 'not found'});
    }
  });
});

app.delete('/delete/:tagId', loggedIn, (req, res) => {
  findTagById(req.params.tagId).then((tag) => {
    if (tag) {
      deleteTag(tag)
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
