module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {
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
    Symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Yield: {
      type: DataTypes.DECIMAL(18,7),
      allowNull: false,
    },
    DividendYieldScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    RelativeValueScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TotalScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Price: {
      type: DataTypes.DECIMAL(18,7),
      allowNull: false,
    },
    IdealValue: {
      type: DataTypes.DECIMAL(18,7),
      allowNull: false,
    },
    Sector: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    RecentPerf: {
      type: DataTypes.DECIMAL(18,7),
      allowNull: false,
    },
    PastPositivePerf: {
      type: DataTypes.DECIMAL(18,7),
      allowNull: false,
    },
    FailedToRetrieveBars: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    PastPerf: {
      type: DataTypes.DECIMAL(18,7),
      allowNull: false,
    },
    NextEarningsDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    TargetPrice: {
      type: DataTypes.DECIMAL(18,7),
      allowNull: true,
    },
    ExDividendDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    AvgVolume: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ADV: {
      type: DataTypes.DECIMAL(18,7),
      allowNull: true,
    },
    TickValue: {
      type: DataTypes.DECIMAL(18,7),
      allowNull: false,
    },
    TickSize: {
      type: DataTypes.DECIMAL(18,7),
      allowNull: false,
    },
  },{
    timestamps: false,
  });
  return Stock;
};
