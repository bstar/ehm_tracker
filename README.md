Archived.  Prototype player tracker for Hockey simulation.

EHM Tracker
=====================

### Purpose
EHM Tracker is a utility that manages player exports from Eastside Hockey Manager and provides an interface visually similar to the game, but with many more useful features. EHM can be purchased here:
http://store.steampowered.com/app/301120/Eastside_Hockey_Manager/

This utility accepts csv player exports from EHM Assistant. Those exports are then translated into a sql lite database and exposed to the view layer.  Each subsequent import will track the history of stat changes for every player in the game.  A react JS front end application then consumes the data allowing for unique charting, searching, history tracking and unique metrics that the game does not provide.

### Technical Details
```
npm install
npm start
open http://localhost:8000
```

Components of EHM Tracker:
- Import script
- Sqlite DB
- Api (Hapi)
- Frontend (React js)
- Electron wrapper

![Alt text](/frontend/public/img/screenshot.png "Player Detail View")
