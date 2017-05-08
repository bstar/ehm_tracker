'use strict';
module.exports = (sequelize, DataTypes) => {
  var stat = sequelize.define('stat', {
    game_date: DataTypes.STRING,

    loyalty: DataTypes.INTEGER,
    pressure: DataTypes.INTEGER,
    professionalism: DataTypes.INTEGER,
    sportsmanship: DataTypes.INTEGER,
    temperament: DataTypes.INTEGER,
    consistency: DataTypes.INTEGER,
    decisions: DataTypes.INTEGER,
    dirtiness: DataTypes.INTEGER,
    potential_ability: DataTypes.INTEGER,
    adaptability: DataTypes.INTEGER,
    ambition: DataTypes.INTEGER,
    important_matches: DataTypes.INTEGER,
    pass_tendency: DataTypes.INTEGER,
    fighting: DataTypes.INTEGER,
    injury_proneness: DataTypes.INTEGER,
    natural_fitness: DataTypes.INTEGER,
    agitation: DataTypes.INTEGER,
    one_on_ones: DataTypes.INTEGER,
    versatility: DataTypes.INTEGER,

    goaltender: DataTypes.INTEGER,
    left_defence: DataTypes.INTEGER,
    right_defence: DataTypes.INTEGER,
    left_wing: DataTypes.INTEGER,
    right_wing: DataTypes.INTEGER,
    center: DataTypes.INTEGER,

    aggression: DataTypes.INTEGER,
    anticipation: DataTypes.INTEGER,
    bravery: DataTypes.INTEGER,
    creativity: DataTypes.INTEGER,
    determination: DataTypes.INTEGER,
    flair: DataTypes.INTEGER,
    influence: DataTypes.INTEGER,
    teamwork: DataTypes.INTEGER,
    work_rate: DataTypes.INTEGER,

    acceleration: DataTypes.INTEGER,
    agility: DataTypes.INTEGER,
    balance: DataTypes.INTEGER,
    speed: DataTypes.INTEGER,
    stamina: DataTypes.INTEGER,
    strength: DataTypes.INTEGER,

    checking: DataTypes.INTEGER,
    deflections: DataTypes.INTEGER,
    deking: DataTypes.INTEGER,
    faceoffs: DataTypes.INTEGER,
    hitting: DataTypes.INTEGER,
    off_the_puck: DataTypes.INTEGER,
    passing: DataTypes.INTEGER,
    pokecheck: DataTypes.INTEGER,
    positioning: DataTypes.INTEGER,
    slapshot: DataTypes.INTEGER,
    stickhandling: DataTypes.INTEGER,
    wristshot: DataTypes.INTEGER,

    blocker: DataTypes.INTEGER,
    glove: DataTypes.INTEGER,
    rebound_control: DataTypes.INTEGER,
    recovery: DataTypes.INTEGER,
    reflexes: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: (models) => {
      }
    }
  });
  return stat;
};
