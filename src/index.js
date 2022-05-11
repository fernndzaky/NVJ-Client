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
import PaymentCompleted from './client/payment_status/PaymentCompleted';
import PaymentExpired from './client/payment_status/PaymentExpired';
import PaymentWaiting from './client/payment_status/PaymentWaiting';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact={true} component={HomePage} />
      <Route path="/experiences" exact={true} component={Experiences} />
      <Route path="/experience/1" exact={true} component={ExperienceDetail} />
      <Route path="/ticket/1" exact={true} component={TicketDetail} />
      <Route path="/about" exact={true} component={AboutUs} />
      <Route path="/tickets" exact={true} component={Tickets} />
      <Route path="/cart" exact={true} component={Cart} />
      <Route path="/checkout" exact={true} component={Payment} />
      <Route path="/payment-completed" exact={true} component={PaymentCompleted} />
      <Route path="/payment-expired" exact={true} component={PaymentExpired} />
      <Route path="/payment-waiting" exact={true} component={PaymentWaiting} />

    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
