/**
 * Created by Emile_Bex on 28/11/2017.
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {THEME} from '../style';

import Tile from './Tile';

class Dashboard extends Component {

  render(){
    const {devices} = this.props;

    return (
      <div style={{display:'flex', padding: 20, paddingTop: 0, flex:1, backgroundColor: THEME.colors.WHITE}}>
        <div style={localStyles.tilesContainer}>
          {
            devices.map((device) => {
              return (
                <Tile key={device.id} device={{...device}} />
              );
            })
          }
        </div>
      </div>
    )
  }

}

const localStyles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  tilesContainer: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center'

  }
};

function mapStateToProps(state, ownProps){
  return {
    devices: state.appContent.devices
  }
}

export default connect(
  mapStateToProps, {}
)(Dashboard)