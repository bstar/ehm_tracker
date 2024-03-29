import React from 'react'
import Main from '../components/layouts/Main';
import Blank from '../components/layouts/Blank';

import MainView from '../views/Main';
import PlayerListView from '../views/PlayerList';
import PlayerShowView from '../views/PlayerShow';

import { Route, Router, IndexRedirect, browserHistory} from 'react-router';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRedirect to="/main" />
      <Route path="/main" component={ MainView }></Route>
      <Route path="/players/:team" component={ PlayerListView }></Route>
      <Route exact={true} path="/players" component={ PlayerListView }></Route>
      <Route path="/player/:id" component={ PlayerShowView }></Route>
    </Route>
  </Router>
);
