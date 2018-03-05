const moment = require('moment');
const TradeTypes = require("wave-trader-enums").TradeTypes;
const TradeTriggers = require("wave-trader-enums").TradeTriggers;
const TrendTypes = require("wave-trader-enums").TrendTypes;

// .Format("{0:M/d/yy h:mm tt}").Title("Exit Date");

// public TradeTriggers Trigger { get; set; }
// public TrendTypes Trend { get; set; }
// public bool Volatile { get; set; }
// public Decimal TickRange { get; set; }

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
    Trigger: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Trend: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Volatile: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    AdjProfitLoss: {
      type: DataTypes.DECIMAL(18, 7),
      allowNull: false,
    },
    ProfitLoss: {
      type: DataTypes.DECIMAL(18, 7),
      allowNull: false,
    },
    ProfitLossPerContract: {
      type: DataTypes.DECIMAL(18, 7),
      allowNull: false,
    },
    Commissions: {
      type: DataTypes.DECIMAL(18, 7),
      allowNull: false,
    },
    TickRange: {
      type: DataTypes.DECIMAL(18, 7),
      allowNull: false,
    },
    EntryDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EntryPrice: {
      type: DataTypes.DECIMAL(18, 7),
      allowNull: false,
    },
    ExitDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ExitPrice: {
      type: DataTypes.DECIMAL(18, 7),
      allowNull: false,
    },
    MarketId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },{
    timestamps: false,
    getterMethods: {
      Symbol() {
        return typeof(this.Market) != 'undefined' && this.Market !== null ? this.Market.Symbol : '';
      },
      EntryDateDisplay() {
        return typeof(this.EntryDate) === 'string' ? this.EntryDate : moment.utc(this.EntryDate).format('M/D/YY h:mm a');
      },
      ExitDateDisplay() {
        return typeof(this.ExitDate) === 'string' ? this.ExitDate :  moment.utc(this.ExitDate).format('M/D/YY h:mm a');
      },
      TradeTypeEnum() {
        return TradeTypes.enumOrdinalOf(this.TradeType);
      },
      TriggerEnum() {
        return TradeTriggers.enumOrdinalOf(this.Trigger);
      },
      TrendEnum() {
        return TrendTypes.enumOrdinalOf(this.Trend);
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
