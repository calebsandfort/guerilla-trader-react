const Stock = require('../models').Stock;
const sequelize = require ('sequelize');

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
        return Stock
            .findAll({
              order: sequelize.literal('Name ASC')
            })
            .then(stocks => res.status(200).send(stocks))
            .catch(error => res.status(400).send(error));
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
