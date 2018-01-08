const Market = require('../models').Market;
const sequelize = require('sequelize');

module.exports = {
  // create(req, res) {
  //     return Todo
  //         .create({
  //             title: req.body.title,
  //         })
  //         .then(todo => res.status(201).send(todo))
  //         .catch(error => res.status(400).send(error));
  // },
  list(req, res) {
    return Market
      .findAll({
        order: sequelize.literal('Active DESC')
      })
      .then(markets => res.status(200).send(markets))
      .catch(error => res.status(400).send(error));
  },
  count(req, res) {
    return Market
      .count()
      .then(c => {
        res.status(200).send({count: c});
      })
      .catch(error => res.status(400).send(error));
  },
  async resultsAndTotal(req, res){
    const [resultsResponse, countResponse] = await Promise.all([Market
      .findAll({
        order: sequelize.literal('Active DESC')
      }),
      Market.count()]);
  
    res.status(200).send({
      results: resultsResponse.map(x => Object.assign({}, x.dataValues)),
      total_count: countResponse
    });
  },
  // retrieve(req, res) {
  //     return Todo
  //         .findById(req.params.todoId, {
  //             include: [{
  //                 model: TodoItem,
  //                 as: 'todoItems',
  //             }],
  //         })
  //         .then(todo => {
  //             if (!todo) {
  //                 return res.status(404).send({
  //                     message: 'Todo Not Found',
  //                 });
  //             }
  //             return res.status(200).send(todo);
  //         })
  //         .catch(error => res.status(400).send(error));
  // },
  // update(req, res) {
  //     return Todo
  //         .findById(req.params.todoId, {
  //             include: [{
  //                 model: TodoItem,
  //                 as: 'todoItems',
  //             }],
  //         })
  //         .then(todo => {
  //             if (!todo) {
  //                 return res.status(404).send({
  //                     message: 'Todo Not Found',
  //                 });
  //             }
  //             return todo
  //                 .update({
  //                     title: req.body.title || todo.title,
  //                 })
  //                 .then(() => res.status(200).send(todo))  // Send back the updated todo.
  //                 .catch((error) => res.status(400).send(error));
  //         })
  //         .catch((error) => res.status(400).send(error));
  // },
  // destroy(req, res) {
  //     return Todo
  //         .findById(req.params.todoId)
  //         .then(todo => {
  //             if (!todo) {
  //                 return res.status(400).send({
  //                     message: 'Todo Not Found',
  //                 });
  //             }
  //             return todo
  //                 .destroy()
  //                 .then(() => res.status(204).send())
  //                 .catch(error => res.status(400).send(error));
  //         })
  //         .catch(error => res.status(400).send(error));
  // }
};
