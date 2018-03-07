const Trade = require('../models').Trade;
const Market = require('../models').Market;
const sequelize = require('sequelize');
const Op = sequelize.Op;
const utilities = require('../utilities');

module.exports = {
  create(req, res) {
    console.log(req);
      return Trade
          .create({
            TradingAccountId: req.body.TradingAccountId,
            TradeType: req.body.TradeType,
            Trigger: req.body.Trigger,
            Trend: req.body.Trend,
            Size: req.body.Size,
            BracketGood: req.body.BracketGood,
            AdjProfitLoss: req.body.AdjProfitLoss,
            ProfitLoss: req.body.ProfitLoss,
            ProfitLossPerContract: req.body.ProfitLossPerContract,
            Commissions: req.body.Commissions,
            ATR: req.body.ATR,
            SmaDiff: req.body.SmaDiff,
            EntryDate: req.body.EntryDate,
            EntryPrice: req.body.EntryPrice,
            ExitDate: req.body.ExitDate,
            ExitPrice: req.body.ExitPrice,
            MarketId: req.body.MarketId,
          })
          .then(trade => res.status(201).send(trade))
          .catch(error => {
            console.log(error);
            res.status(400).send(error)
          });
  },
  list(req, res) {
    console.log(req.query);
    return Trade
      .findAll({
        order: sequelize.literal('EntryDate DESC'),
        offset: (parseInt(req.query.page) - 1) * parseInt(req.query.pageSize),
        limit: parseInt(req.query.pageSize),
        include: [
          {
            model: Market,
            as: 'Market',
            attributes: ['Symbol']
          }
        ]
      })
      .then(trades => res.status(200).send(trades))
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

    return Trade
      .findAndCountAll({
        where: sequalizeFilter,
        order: orderArray,
        offset: (parseInt(req.query.page) - 1) * parseInt(req.query.pageSize),
        limit: parseInt(req.query.pageSize),
        include: [
          {
            model: Market,
            as: 'Market',
            attributes: ['Symbol']
          }
        ]
      })
      .then(result => {
        const response = {
          data: result.rows,
          total: result.count
        }
        res.status(200).send(response)
      })
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  },
  count(req, res) {
    return Trade
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

      return Trade
        .findAll({
          order: orderArray,
          offset: (parseInt(req.query.page) - 1) * parseInt(req.query.pageSize),
          limit: parseInt(req.query.pageSize),
          include: [
            {
              model: Market,
              as: 'Market',
              attributes: ['Symbol']
            }
          ]
        })
        .then(trades => {
          response.data = trades;
          Trade
            .count()
            .then(c => {
              response.total = c;
              res.status(200).send(response);
            });
        });
    });
  },
  // async resultsAndTotal(req, res){
  //   const [resultsResponse, countResponse] = await Promise.all([Trade
  //     .findAll({
  //       order: sequelize.literal('Active DESC')
  //     }),
  //     Trade.count()]);
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
