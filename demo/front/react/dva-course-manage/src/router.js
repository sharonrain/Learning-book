import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Products  from './routes/Products';
import Count from './routes/Count';
import Authors from './routes/Authors';
import Courses from './routes/Courses';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/products" exact component={Products} />
        <Route path="/count" exact component={Count} />
        <Route path="/authors" exact component={Authors} />
        <Route path="/courses" exact component={Courses} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
