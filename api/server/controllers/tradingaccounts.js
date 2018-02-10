const TradingAccount = require('../models').TradingAccount;
const PerformanceCycle = require('../models').PerformanceCycle;
const TradingAccountSnapshot = require('../models').TradingAccountSnapshot;
const Trade = require('../models').Trade;
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
    return TradingAccount
      .findAll({
        include: [{
          model: PerformanceCycle,
          as: 'PerformanceCycles',
        },
        //   {
        //   model: Trade,
        //   as: 'Trades',
        //   include: [
        //     {
        //       model: Market,
        //       as: 'Market',
        //       attributes: ['Symbol']
        //     }
        //   ]
        // }
        ],
      })
      .then(tradingAccounts => res.status(200).send(tradingAccounts))
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  },
  count(req, res) {
    return TradingAccount
      .count()
      .then(c => {
        res.status(200).send({count: c});
      })
      .catch(error => res.status(400).send(error));
  },
  // async resultsAndTotal(req, res){
  //   const [resultsResponse, countResponse] = await Promise.all([TradingAccount
  //     .findAll({
  //       order: sequelize.literal('Active DESC')
  //     }),
  //     TradingAccount.count()]);
  //
  //   res.status(200).send({
  //     results: resultsResponse.map(x => Object.assign({}, x.dataValues)),
  //     total_count: countResponse
  //   });
  // },
  retrieve(req, res) {
    return TradingAccount
      .findById(req.params.tradingAccountId,
        {
          include: [
            {
              model: PerformanceCycle,
              as: 'PerformanceCycles',
            },
            {
            model: Trade,
            as: 'Trades',
            include: [
              {
                model: Market,
                as: 'Market',
                attributes: ['Symbol']
              }
            ]
          }
          ],
        })
      .then(tradingAccount => {
        if (!tradingAccount) {
          return res.status(404).send({
            message: 'Trading Account Not Found',
          });
        }
        return res.status(200).send(tradingAccount);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {

    return TradingAccount
      .findById(req.params.tradingAccountId)
      .then(tradingAccount => {
        if (!tradingAccount) {
          return res.status(404).send({
            message: 'TradingAccount Not Found',
          });
        }

        return tradingAccount
          .update({
            Name: req.body.Name || tradingAccount.Name,
            InitialCapital: req.body.InitialCapital || tradingAccount.InitialCapital,
            CurrentCapital: req.body.CurrentCapital || tradingAccount.CurrentCapital,
            Commissions: req.body.Commissions || tradingAccount.Commissions,
            Active: req.body.Active || tradingAccount.Active,
            InceptionDate: req.body.InceptionDate || tradingAccount.InceptionDate,
          })
          .then(() => res.status(200).send(tradingAccount))  // Send back the updated tradingAccount.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return TradingAccount
      .findById(req.params.tradingAccountId)
      .then(tradingAccount => {
        if (!tradingAccount) {
          return res.status(400).send({
            message: 'TradingAccount Not Found',
          });
        }
        return tradingAccount
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
