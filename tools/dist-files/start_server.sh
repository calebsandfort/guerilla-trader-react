#!/bin/bash
cd /home/ec2-user/app/api
npm install
sleep 5
cd /home/ec2-user/app/socket-server
npm install
sleep 5
forever start server.js
sleep 5
cd /home/ec2-user/app/
sleep 5
npm install
sleep 5
forever start app.js

