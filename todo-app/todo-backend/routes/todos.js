const express = require('express');
const { Todo } = require('../mongo');
const { setAsync, getAsync } = require('../redis');
const { ADDED_TODOS_STRING } = require('../util/config');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {  
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const todosCount = await getAsync(ADDED_TODOS_STRING)
  if (!todosCount) {
    setAsync(ADDED_TODOS_STRING, 1)
  } else {
    setAsync(ADDED_TODOS_STRING, Number(todosCount) + 1)
  }

  res.send(todo);
});

/* GET number of todos created */
router.get('/statistics', async (req, res) => {
  const todos = await getAsync(ADDED_TODOS_STRING)
  res.send({ "added_todos": Number(todos)})
})

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = {
    text: req.todo.text,
    done: req.todo.done
  }
  res.send(todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  req.todo.text = req.body.text
  req.todo.done = req.body.done
  const updatedTodo = await req.todo.save()
  res.send(updatedTodo);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
