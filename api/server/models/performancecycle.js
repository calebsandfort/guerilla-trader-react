module.exports = (sequelize, DataTypes) => {
  const PerformanceCycle = sequelize.define('PerformanceCycle', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    Display: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CycleType: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    R: {
      type: DataTypes.DECIMAL(18,7),
      allowNull: false,
    },
    MaxDrawdown: {
      type: DataTypes.DECIMAL(18,7),
      allowNull: false,
    },
    TradingAccountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    WinningTrades: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    LosingTrades: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TotalTrades: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    SuccessRate: {
      type: DataTypes.DECIMAL(18,7),
      allowNull: false,
    },
    StartCapital: {
      type: DataTypes.DECIMAL(18,7),
      allowNull: false,
    },
    EndCapital: {
      type: DataTypes.DECIMAL(18,7),
      allowNull: false,
    },
    ProfitLoss: {
      type: DataTypes.DECIMAL(18,7),
      allowNull: false,
    },
    PPC: {
      type: DataTypes.DECIMAL(18,7),
      allowNull: false,
    },
  },{
    timestamps: false,
  });

  PerformanceCycle.associate = (models) => {
    PerformanceCycle.belongsTo(models.TradingAccount, {
      foreignKey: 'TradingAccountId',
      onDelete: 'CASCADE',
    });
  };

  return PerformanceCycle;
};
