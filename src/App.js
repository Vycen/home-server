import React, {
  Component
} from 'react';
import {THEME} from './style';
import {connect} from 'react-redux';

import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <div style={localStyles.app}>
        <header style={localStyles.appHeader}>
          <i style={localStyles.appLogo} className="fa fa-home" aria-hidden="true" />
          <h1 style={localStyles.appTitle}>Home Dashboard</h1>
        </header>
        <Dashboard />
      </div>
    );
  }
}

const localStyles = {
  app: {
    textAlign: 'center'
  },

  appLogo: {
    fontSize: 100,
    color: THEME.colors.WHITE
  },

  appHeader: {
    backgroundColor: THEME.colors.BLUE,
    height: 150,
    padding: 20,
    marginBottom: 20,
    color: THEME.colors.WHITE,
    boxShadow: '0px 10px 30px rgba(0,0,0,0.1)'
  },

  appTitle: {
    fontSize: 26
  },

  dashboard: {
    fontSize: 20
  }
};

function mapStateToProps(state, ownProps){
  return {
  }
}

export default connect(
  mapStateToProps, {}
)(App)