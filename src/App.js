import { useRouteMatch, Route, Switch, Redirect } from "react-router";
import cn from 'classnames';
import HomePage from "./routes/HomePage";
import GamePage from "./routes/GamePage";
import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer";

import s from "./style.module.css";
import AboutPage from "./routes/About";
import NotFoundPage from "./routes/NotFound";
import ContactPage from "./routes/ContactPage";

const App = () => {
  const match = useRouteMatch('/');

  return (
    <Switch>
      <Route path="/404" component={NotFoundPage} />
      <Route>
        <>
          <MenuHeader bgActive={!match.isExact} />
          <div className={cn(s.wrap, {
            [s.isHomePage]: match.isExact
          })}>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/home" component={HomePage} />
              <Route path="/game" component={GamePage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/contact" component={ContactPage} />
              <Route render={() => {
                <Redirect to="/404" />
              }} />
            </Switch>
          </div>
          <Footer />
        </>
      </Route>
    </Switch>
  )
}

export default App;
