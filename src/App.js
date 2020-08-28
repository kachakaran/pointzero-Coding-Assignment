import React from 'react';
import './App.css';
import './Style/Default.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './component/search';
import Albums from './component/albums';
class App extends React.Component {


  render() {
    const PageNotFound = () => {
      return <h1>Page Not Found</h1>
    }
    return (
      <BrowserRouter>
        <div className="App">
          <h1 className="title">PLAYER </h1>
          <Switch>
            <Route exact path="/" component={Search} />

            <Route path="/albums" component={Albums} />
            <Route component={PageNotFound} />
          </Switch>

        </div>
      </BrowserRouter>
    );
  };
}



export default App;
