const tradingAccountsController = require('../controllers').tradingAccounts;
const tradeSettingsController = require('../controllers').tradeSettings;
const marketsController = require('../controllers').markets;
const stocksController = require('../controllers').stocks;
const smsController = require('../controllers').sms;
const tradesController = require('../controllers').trades;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Guerilla Trader API!',
  }));

  // app.post('/api/todos', todosController.create);
  // app.get('/api/todos/:todoId', todosController.retrieve);
  // app.put('/api/todos/:todoId', todosController.update);
  // app.delete('/api/todos/:todoId', todosController.destroy);
  //
  // app.post('/api/todos/:todoId/items', todoItemsController.create);
  // app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
  // app.delete(
  //     '/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy
  // );


  //app.get('/api/markets/resultsAndTotal', marketsController.resultsAndTotal);


  // app.get('/api/tradingaccounts/resultsAndTotal', tradingAccountsController.resultsAndTotal);
  app.get('/api/tradingaccounts/count', tradingAccountsController.count);
  app.get('/api/tradingaccounts', tradingAccountsController.list);
  // app.post('/api/tradingAccounts', tradingAccountsController.create);
  app.get('/api/tradingAccounts/:tradingAccountId', tradingAccountsController.retrieve);
  app.put('/api/tradingAccounts/:tradingAccountId', tradingAccountsController.update);
  app.delete('/api/tradingAccounts/:tradingAccountId', tradingAccountsController.destroy);

  // app.get('/api/tradeSettings/resultsAndTotal', tradeSettingsController.resultsAndTotal);
  app.get('/api/tradeSettings/count', tradeSettingsController.count);
  app.get('/api/tradeSettings', tradeSettingsController.list);
  // app.post('/api/tradeSettings', tradeSettingsController.create);
  app.get('/api/tradeSettings/:tradeSettingsId', tradeSettingsController.retrieve);
  app.put('/api/tradeSettings/:tradeSettingsId', tradeSettingsController.update);
  app.delete('/api/tradeSettings/:tradeSettingsId', tradeSettingsController.destroy);

  app.get('/api/markets/resultsAndTotal', marketsController.resultsAndTotal);
  app.get('/api/markets/findAndCountAll', marketsController.findAndCountAll);
  app.get('/api/markets/count', marketsController.count);
  app.get('/api/markets', marketsController.list);

  app.get('/api/stocks/findAndCountAll', stocksController.findAndCountAll);
  app.get('/api/stocks/listAndCount', stocksController.listAndCount);
  app.get('/api/stocks/count', stocksController.count);
  app.get('/api/stocks', stocksController.list);

  app.get('/api/trades/findAndCountAll', tradesController.findAndCountAll);
  app.get('/api/trades/findAll', tradesController.findAll);
  app.get('/api/trades/listAndCount', tradesController.listAndCount);
  app.get('/api/trades/count', tradesController.count);
  app.get('/api/trades', tradesController.list);
  app.post('/api/trades', tradesController.create);
  // app.put('/api/trades/:tradingAccountId', tradesController.update);


  app.post('/sms/receive', smsController.receive);

  // For any other request method on todo items, we're going to return "Method Not Allowed"
  // app.all('/api/todos/:todoId/items', (req, res) =>
  //     res.status(405).send({
  //         message: 'Method Not Allowed',
  //     }));
};
