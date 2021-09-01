import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import ErrorScreen from './components/helpers/ErrorScreen';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import './bootstrap/css/bootstrap.min.css';
import './css/custom.css';
import './css/custom-lemar.css';
import './css/helpers.css';

import store from './store';

import { Provider } from 'react-redux';

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      currentScreen: 'App'
    };
  }

  gotoApp() {
    this.setState({
      currentScreen: 'App'
    });
  }
  render() {
    let showScreen = this.state.currentScreen;

    if (showScreen === 'App') {
      showScreen = <Provider store={store}><App/></Provider>;
      return showScreen;
    }

    return (
      <BrowserRouter>
        <div className="App">
            <div>
              <Switch>
              <Route
                exact
                render={(props) => {
                  if (showScreen === 'App') {
                    return <Provider store={store}></Provider>;
                  }
                }}

              />
              </Switch>
            </div>
        </div>

      </BrowserRouter>)

  }
};


ReactDOM.render(<Main/>, document.getElementById('root'));
registerServiceWorker();
