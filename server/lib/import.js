// TODO make into exportable lib

const api         = require('./api'),
      models      = require('../models'),
      utils       = require('../lib/utils').utils,
      csv         = require('csvtojson'),
      argv        = require('minimist')(process.argv.slice(2)),
      game_date   = argv.date,
      csvFilePath = argv.location;

var initPlayer = (doc) => {
  var player = {};
  // general non-stat player properties
  // TODO: why are height and weight not exported?
  player.id = parseInt(doc.Id, 10);
  player.name = doc.Name;
  player.nation = doc.Nation;
  player.second_nation = doc['Second Nation'];
  player.international_apps = doc['International Apps'];
  player.international_goals = doc['International Goals'];
  player.international_assists = doc['International Assists'];
  player.estimated_value = doc['Estimated Value'];
  player.club_playing = doc['Club Playing'];
  player.division_playing = doc['Division Playing'];
  player.club_contracted = doc['Club Contracted'];
  player.positions_short = doc['Positions Short'];
  player.stanley_cups_won = doc['Stanley Cups Won'];
  player.birth_town = doc['Birth Town'];
  player.date_of_birth = doc['Date Of Birth'];
  player.age = doc.Age;
  player.current_ability = doc['Current Ability'];
  player.home_reputation = doc['Home Reputation'];
  player.current_reputation = doc['Current Reputation'];
  player.world_reputation = doc['World Reputation'];
  player.handedness = doc.Handedness;
  player.junior_preference = doc['Junior Preference'];
  player.player_roles = doc['Player Roles'];
  player.defensive_role = doc['Defensive Role'];
  player.offensive_role = doc['Offensive Role'];
  player.morale = doc.Morale;
  player.favorite_number = doc['Favorite Number'];
  player.squad_number = doc['Squad Number'];

  // stats hidden by the game, should probably not be revealed in UI
  player.stats = {};
  player.stats.game_date = game_date;
  player.stats.loyalty = doc.Loyalty;
  player.stats.pressure = doc.Pressure;
  player.stats.professionalism = doc.Professionalism;
  player.stats.sportsmanship = doc.Sportsmanship;
  player.stats.temperament = doc.Temperament;
  player.stats.consistency = doc.Consistency;
  player.stats.decisions = doc.Decisions;
  player.stats.dirtiness = doc.Dirtiness;
  player.stats.potential_ability = doc['Potential Ability'];
  player.stats.adaptability = doc.Adaptability;
  player.stats.ambition = doc.Ambition;
  player.stats.important_matches = doc['Important Matches'];
  player.stats.pass_tendency = doc['Pass Tendency'];
  player.stats.fighting = doc.Fighting;
  player.stats.injury_proneness = doc['Injury Proneness'];
  player.stats.natural_fitness = doc['Natural Fitness'];
  player.stats.agitation = doc.Agitation;
  player.stats.one_on_ones = doc['One On Ones'];
  player.stats.versatility = doc.Versatility;

  // positional stat ratings
  player.stats.goaltender = doc.Goaltender;
  player.stats.left_defence = doc['Left Defence'];
  player.stats.right_defence = doc['Right Defence'];
  player.stats.left_wing = doc['Left Wing'];
  player.stats.right_wing = doc['Right Wing'];
  player.stats.center = doc.Center;

  // stats labeled as 'mental' in game
  player.stats.aggression = doc.Aggression;
  player.stats.anticipation = doc.Anticipation;
  player.stats.bravery = doc.Bravery;
  player.stats.creativity = doc.Creativity;
  player.stats.determination = doc.Determination;
  player.stats.flair = doc.Flair;
  player.stats.influence = doc.Influence;
  player.stats.teamwork = doc.Teamwork;
  player.stats.work_rate = doc['Work Rate'];

  // stats labeled as 'physical' in game
  player.stats.acceleration = doc.Acceleration;
  player.stats.agility = doc.Agility;
  player.stats.balance = doc.Balance;
  player.stats.speed = doc.Speed;
  player.stats.stamina = doc.Stamina;
  player.stats.strength = doc.Strength;

  // stats labeled as 'technical' in game for forwards and defencemen
  player.stats.checking = doc.Checking;
  player.stats.deflections = doc.Deflections;
  player.stats.deking = doc.Deking;
  player.stats.faceoffs = doc.Faceoffs;
  player.stats.hitting = doc.Hitting;
  player.stats.off_the_puck = doc['Off The Puck'];
  player.stats.passing = doc.Passing;
  player.stats.pokecheck = doc.Pokecheck;
  player.stats.positioning = doc.Positioning;
  player.stats.slapshot = doc.Slapshot;
  player.stats.stickhandling = doc.Stickhandling;
  player.stats.wristshot = doc.Wristshot;

  // stats labeled as 'technical' in game for goalies
  player.stats.blocker = doc.Blocker;
  player.stats.glove = doc.Glove;
  player.stats.rebound_control = doc['Rebound Control'];
  player.stats.recovery = doc.Recovery;
  player.stats.reflexes = doc.Reflexes;

  return player;
};

var updatePlayerDb = async (csvPlayer) => {
  var dbPlayer = await api.players.cliGetById(csvPlayer.id);

  if (dbPlayer) {
    await api.players.cliUpdate(csvPlayer, dbPlayer);
  } else {
    await api.players.cliCreate(csvPlayer);
  }
};

var processCsv = () => {
  csv({ delimiter: ";" })
      .fromFile(csvFilePath)
      .on('json', (csvPlayer) => {
        let player = initPlayer(csvPlayer);
        player.game_date = game_date;

        updatePlayerDb(player);
      })
      .on('done', (error) => {
        console.log('Import done.');
      });
};

var run = () => {
  if (utils.isValidDate(game_date)) {
    processCsv();
  } else {
    console.log("Date Arg is Not Provided or is Invalid:", game_date);
  }
}

models.sequelize.sync().then(run);
