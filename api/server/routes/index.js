const tradingAccountsController = require('../controllers').tradingAccounts;
const marketsController = require('../controllers').markets;
const stocksController = require('../controllers').stocks;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Guerilla Trader API!',
  }));

  // app.post('/api/todos', todosController.create);
  app.get('/api/tradingaccounts', tradingAccountsController.list);
  // app.get('/api/todos/:todoId', todosController.retrieve);
  // app.put('/api/todos/:todoId', todosController.update);
  // app.delete('/api/todos/:todoId', todosController.destroy);
  //
  // app.post('/api/todos/:todoId/items', todoItemsController.create);
  // app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
  // app.delete(
  //     '/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy
  // );


  app.get('/api/markets/count', marketsController.count);
  app.get('/api/markets', marketsController.list);
  app.get('/api/stocks', stocksController.list);

  // For any other request method on todo items, we're going to return "Method Not Allowed"
  // app.all('/api/todos/:todoId/items', (req, res) =>
  //     res.status(405).send({
  //         message: 'Method Not Allowed',
  //     }));
};
