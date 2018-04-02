const Stock = require('../models').Stock;
const sequelize = require('sequelize');
const Op = sequelize.Op;
const utilities = require('../utilities');

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
        order: sequelize.literal('Name ASC'),
        offset: (parseInt(req.query.page) - 1) * parseInt(req.query.pageSize),
        limit: parseInt(req.query.pageSize)
      })
      .then(stocks => res.status(200).send(stocks))
      .catch(error => res.status(400).send(error));
  },
  findAndCountAll(req, res) {

    let orderArray = null;

    if(req.query.sort !== undefined && req.query.sort.length){
      orderArray = req.query.sort.map(x => [x.field, x.dir]);
    }

    let sequalizeFilter = null;

    if(req.query.filter && req.query.filter.filters && req.query.filter.filters.length > 0){
      let filterArray = [];

      for(let i = 0; i < req.query.filter.filters.length; i++){
        const kf = req.query.filter.filters[i];
        const sf = {};

        sf[kf.field] = {
          [utilities.kendoOpToSequalizeOp(kf.operator)]: utilities.parameterize(kf.operator, kf.value)
        };

        filterArray.push(sf);
      }


      sequalizeFilter = {[Op.and]: filterArray};
    }

    return Stock
      .findAndCountAll({
        where: sequalizeFilter,
        order: orderArray,
        offset: (parseInt(req.query.page) - 1) * parseInt(req.query.pageSize),
        limit: parseInt(req.query.pageSize)
      })
      .then(result => {
        const response = {
          data: result.rows,
          total: result.count
        }
        res.status(200).send(response)
      })
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
  listAndCount(req, res){
    return new Promise((resolve) => {

      let response = {
        data: [],
        total: 0
      }

      let orderArray = null;

      if(req.query.sort !== undefined && req.query.sort.length){
        orderArray = req.query.sort.map(x => [x.field, x.dir]);
      }

      return Stock
        .findAll({
          order: orderArray,
          offset: (parseInt(req.query.page) - 1) * parseInt(req.query.pageSize),
          limit: parseInt(req.query.pageSize)
        })
        .then(stocks => {
          response.data = stocks;
          Stock
            .count()
            .then(c => {
              response.total = c;
              res.status(200).send(response);
            });
        });
    });
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
