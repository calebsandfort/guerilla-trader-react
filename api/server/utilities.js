const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
  kendoOpToSequalizeOp(kendoOp){
    let sequalizeOp = Op.eq;

    switch (kendoOp) {
      case "startswith":
        sequalizeOp = Op.like;
        break;
      case "gte":
        sequalizeOp = Op.gte;
        break;
      case "eq":
        sequalizeOp = Op.eq;
        break;
    }

    return sequalizeOp;
  },

  parameterize(kendoOp, parameter){
    let p = parameter;

    switch (kendoOp) {
      case "startswith":
        p = `${parameter}%`;
        break;
      case "gte":
        p = parseFloat(parameter);
        break;
    }

    return p;
  }
};
