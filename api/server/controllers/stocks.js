const Stock = require('../models').Stock;
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
    console.log(req.query);
    return Stock
      .findAll({
        order: sequelize.literal('Name ASC'),
        offset: (parseInt(req.query.page) - 1) * parseInt(req.query.pageSize),
        limit: parseInt(req.query.pageSize)
      })
      .then(stocks => res.status(200).send(stocks))
      .catch(error => res.status(400).send(error));
  },
  count(req, res) {
    return Stock
      .count()
      .then(c => {
        res.status(200).send({count: c});
      })
      .catch(error => res.status(400).send(error));
  },
  // async resultsAndTotal(req, res){
  //   const [resultsResponse, countResponse] = await Promise.all([Stock
  //     .findAll({
  //       order: sequelize.literal('Active DESC')
  //     }),
  //     Stock.count()]);
  //
  //   res.status(200).send({
  //     results: resultsResponse.map(x => Object.assign({}, x.dataValues)),
  //     total_count: countResponse
  //   });
  // },
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
