import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import ReactDOM from 'react-dom';
import './index.css';
import './client/components/FontAwesomeIcons';

import reportWebVitals from './reportWebVitals';
import HomePage from './client/HomePage';
import Experiences from './client/Experiences';
import ExperienceDetail from './client/ExperienceDetail';
import AboutUs from './client/AboutUs';
import Tickets from './client/Tickets';
import TicketDetail from './client/TicketDetail';
import Cart from './client/Cart';
import Payment from './client/Payment';
import PageNotFound from './client/PageNotFound';
import PaymentStatus from './client/payment_status/PaymentStatus';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact={true} component={HomePage} />
      <Route path="/experiences" exact={true} component={Experiences} />
      <Route path="/experience/:id" exact={true} component={ExperienceDetail} />
      <Route path="/ticket/:id" exact={true} component={TicketDetail} />
      <Route path="/about" exact={true} component={AboutUs} />
      <Route path="/tickets" exact={true} component={Tickets} />
      <Route path="/cart" exact={true} component={Cart} />
      <Route path="/checkout" exact={true} component={Payment} />
      <Route path="/payment-status" exact={true} component={PaymentStatus} />
      <Route path="/404" exact={true} component={PageNotFound} />
      <Route path="*" component={PageNotFound} />

    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
