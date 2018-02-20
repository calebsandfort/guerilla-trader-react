const uuidv1 = require('uuid/v1');

module.exports = (sequelize, DataTypes) => {
  const TradeSettings = sequelize.define('TradeSettings', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TickValue: {
      type: DataTypes.DECIMAL(18, 7),
      allowNull: false,
    },
    Contracts: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    RewardTicks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    RiskTicks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    RoundTripCommissions: {
      type: DataTypes.DECIMAL(18, 7),
      allowNull: false,
    }
  },{
    timestamps: false,
    getterMethods: {
      Risk() {
        return this.Contracts * this.RiskTicks * this.TickValue;
      },
      Reward() {
        return this.Contracts * this.RewardTicks * this.TickValue;
      },
      TotalComissions() {
        return this.Contracts * this.RoundTripCommissions;
      },
      Uuid(){
        return uuidv1();
      }
    }
  });
  return TradeSettings;
};
