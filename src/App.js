import { useLocation, Route, Switch, Redirect } from "react-router";
import cn from 'classnames';
import { NotificationContainer } from "react-notifications";
import 'react-notifications/lib/notifications.css';

import HomePage from "./routes/HomePage";
import GamePage from "./routes/GamePage";
import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer";
import AboutPage from "./routes/About";
import NotFoundPage from "./routes/NotFound";
import ContactPage from "./routes/ContactPage";

import PrivateRoute from "./components/PrivateRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserAsync } from "./store/user";

import s from "./style.module.css";

const App = () => {
  const location = useLocation();
  const isPadding = location.pathname === '/' || location.pathname === '/game/board';
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAsync());
  }, [])
  return (
    <>
      <Switch>
      <Route path="/404" component={NotFoundPage} />
      <Route>
        <>
          <MenuHeader bgActive={!isPadding} />
          <div className={cn(s.wrap, {
            [s.isHomePage]: isPadding
          })}>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/home" component={HomePage} />
              <PrivateRoute path="/game" component={GamePage} />
              <PrivateRoute path="/about" component={AboutPage} />
              <PrivateRoute path="/contact" component={ContactPage} />
              <Route render={() => {
                <Redirect to="/404" />;
              } } />
            </Switch>
          </div>
          <Footer />
        </>
      </Route>
      </Switch>
      <NotificationContainer />
    </>
  )
}

export default App;
