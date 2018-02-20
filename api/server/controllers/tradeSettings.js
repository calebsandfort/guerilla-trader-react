const TradeSettings = require('../models').TradeSettings;
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
    return TradeSettings
      .findAll({})
      .then(tradeSettings => res.status(200).send(tradeSettings))
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  },
  count(req, res) {
    return TradeSettings
      .count()
      .then(c => {
        res.status(200).send({count: c});
      })
      .catch(error => res.status(400).send(error));
  },
  // async resultsAndTotal(req, res){
  //   const [resultsResponse, countResponse] = await Promise.all([TradeSettings
  //     .findAll({
  //       order: sequelize.literal('Active DESC')
  //     }),
  //     TradeSettings.count()]);
  //
  //   res.status(200).send({
  //     results: resultsResponse.map(x => Object.assign({}, x.dataValues)),
  //     total_count: countResponse
  //   });
  // },
  retrieve(req, res) {
    return TradeSettings
      .findById(req.params.tradeSettingsId,
        {})
      .then(tradeSettings => {
        if (!tradeSettings) {
          return res.status(404).send({
            message: 'TTradeSettings Not Found',
          });
        }
        return res.status(200).send(tradeSettings);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {

    return TradeSettings
      .findById(req.params.tradeSettingsId)
      .then(tradeSettings => {
        if (!tradeSettings) {
          return res.status(404).send({
            message: 'TradeSettings Not Found',
          });
        }

        return tradeSettings
          .update({
            Name: req.body.Name || tradeSettings.Name,
            TickValue: req.body.TickValue || tradeSettings.TickValue,
            Contracts: req.body.Contracts || tradeSettings.Contracts,
            RewardTicks: req.body.RewardTicks || tradeSettings.RewardTicks,
            RiskTicks: req.body.RiskTicks || tradeSettings.RiskTicks,
            RoundTripCommissions: req.body.RoundTripCommissions || tradeSettings.RoundTripCommissions,
          })
          .then(() => res.status(200).send(tradeSettings))  // Send back the updated tradeSettings.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return TradeSettings
      .findById(req.params.tradeSettingsId)
      .then(tradeSettings => {
        if (!tradeSettings) {
          return res.status(400).send({
            message: 'TradeSettings Not Found',
          });
        }
        return tradeSettings
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
