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
      type: DataTypes.DATE,
      allowNull: false,
    }
  },{
    timestamps: false,
  });
  return TradingAccount;
};
