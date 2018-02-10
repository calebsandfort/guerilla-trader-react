const moment = require('moment');
const uuidv1 = require('uuid/v1');

module.exports = (sequelize, DataTypes) => {
  const TradingAccount = sequelize.define('TradingAccount', {
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
    InitialCapital: {
      type: DataTypes.DECIMAL(18, 7),
      allowNull: false,
    },
    CurrentCapital: {
      type: DataTypes.DECIMAL(18, 7),
      allowNull: false,
    },
    Commissions: {
      type: DataTypes.DECIMAL(18, 7),
      allowNull: false,
    },
    ProfitLoss: {
      type: DataTypes.DECIMAL(18, 7),
      allowNull: false,
    },
    AdjProfitLoss: {
      type: DataTypes.DECIMAL(18, 7),
      allowNull: false,
    },
    Active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    TotalReturn: {
      type: DataTypes.DECIMAL(18, 7),
      allowNull: false,
    },
    CAGR: {
      type: DataTypes.DECIMAL(18, 7),
      allowNull: false,
    },
    InceptionDate: {
      type: DataTypes.DATEONLY,
      get: function() {
        return moment.utc(this.getDataValue('InceptionDate')).format('YYYY-MM-DD');
      },
      allowNull: false,
    }
  },{
    timestamps: false,
    getterMethods: {
      AllPerformanceCycle() {
        if(this.PerformanceCycles !== null){
          const allPerformanceCycle = this.PerformanceCycles.filter(pc => pc.CycleType == 8);
          if (allPerformanceCycle.length) return allPerformanceCycle[0];
        }

        return null;
      },
      Uuid(){
        return uuidv1();
      }
    }
  });

  TradingAccount.associate = (models) => {
    TradingAccount.hasMany(models.PerformanceCycle, {
      foreignKey: 'TradingAccountId',
      as: 'PerformanceCycles',
    });

    TradingAccount.hasMany(models.Trade, {
      foreignKey: 'TradingAccountId',
      as: 'Trades',
    });
  };

  return TradingAccount;
};
