'use strict';
module.exports = (sequelize, DataTypes) => {
  var player = sequelize.define('player', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
    name: DataTypes.STRING,
    nation: DataTypes.STRING,
    second_nation: DataTypes.STRING,
    international_apps: DataTypes.STRING,
    international_goals: DataTypes.STRING,
    international_assists: DataTypes.STRING,
    estimated_value: DataTypes.STRING,
    club_playing: DataTypes.STRING,
    division_playing: DataTypes.STRING,
    club_contracted: DataTypes.STRING,
    positions_short: DataTypes.STRING,
    stanley_cups_won: DataTypes.INTEGER,
    birth_town: DataTypes.STRING,
    date_of_birth: DataTypes.STRING,
    age: DataTypes.INTEGER,
    current_ability: DataTypes.INTEGER,
    home_reputation: DataTypes.INTEGER,
    current_reputation: DataTypes.INTEGER,
    world_reputation: DataTypes.INTEGER,
    handedness: DataTypes.STRING,
    junior_preference: DataTypes.STRING,
    player_roles: DataTypes.STRING,
    defensive_role: DataTypes.INTEGER,
    offensive_role: DataTypes.INTEGER,
    morale: DataTypes.INTEGER,
    favorite_number: DataTypes.INTEGER,
    squad_number: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        player.hasMany(models.stat);
      }
    }
  });
  return player;
};
