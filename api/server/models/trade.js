const moment = require('moment');

// .Format("{0:M/d/yy h:mm tt}").Title("Exit Date");

module.exports = (sequelize, DataTypes) => {
  const Trade = sequelize.define('Trade', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    TradingAccountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TradeType: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    AdjProfitLoss: {
      type: DataTypes.DECIMAL(18, 7),
      allowNull: false,
    },
    EntryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ExitDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    MarketId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },{
    timestamps: false,
    getterMethods: {
      Symbol() {
        return this.Market !== null ? this.Market.Symbol : '';
      },
      EntryDateDisplay() {
        return moment.utc(this.EntryDate).format('M/D/YY h:mm a');
      },
      ExitDateDisplay() {
        return moment.utc(this.ExitDate).format('M/D/YY h:mm a');
      }
    }
  });

  Trade.associate = (models) => {
    Trade.belongsTo(models.TradingAccount, {
      foreignKey: 'TradingAccountId',
      onDelete: 'CASCADE',
    });

    Trade.belongsTo(models.Market, {
      foreignKey: 'MarketId',
      onDelete: 'CASCADE',
    });
  };

  return Trade;
};
