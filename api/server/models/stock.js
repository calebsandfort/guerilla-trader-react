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
    Sector: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },{
    timestamps: false,
  });
  return Stock;
};
