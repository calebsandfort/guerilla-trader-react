#!/bin/bash
cd /home/ec2-user/app/api
npm install
cd /home/ec2-user/app/
npm install
forever start app.js

