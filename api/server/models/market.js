module.exports = (sequelize, DataTypes) => {
  const Market = sequelize.define('Market', {
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
    TickValue: {
      type: DataTypes.DECIMAL(18, 7),
      allowNull: false,
    },
    TickSize: {
      type: DataTypes.DECIMAL(18, 7),
      allowNull: false,
    },
    InitialMargin: {
      type: DataTypes.DECIMAL(18, 7),
      allowNull: false,
    },
    Active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },{
    timestamps: false,
  });
  return Market;
};
