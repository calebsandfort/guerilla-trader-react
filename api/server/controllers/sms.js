const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports = {
  receive(req, res)
  {
    console.log(req.body)

    const twiml = new MessagingResponse();

    twiml.message('The Robots are coming! Head for the hills!');

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }
};
