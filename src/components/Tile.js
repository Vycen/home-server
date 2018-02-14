import React, {
  Component
} from "react";
import {connect} from "react-redux";

import Switch from 'rc-switch';

import {THEME} from '../style';

import {toggle} from '../actions';

class Tile extends Component {

  render() {
    const {device, toggle} = this.props;

    let color = THEME.colors.WHITE;
    if(device.type === 'dig') {
      color = !device.status ? THEME.colors.GREY : (device.value ? THEME.colors.GREEN : THEME.colors.ORANGE);
    }

    return (
      <div style={{...localStyles.tile, backgroundColor: color}}>
        <div style={{textAlign: 'center', fontSize: 22, marginBottom: 20, color: THEME.colors.WHITE}}>
           {device.name}
        </div>
        <i style={localStyles.icon} className={device.icon} aria-hidden="true" />
        {device.type === 'dig' && <Switch disabled={!device.status}
                                          onClick={() => {
                                            if(device.status) {
                                              toggle(device);
                                            }
                                          }}
                                          checked={device.value} />}
        <div style={{textAlign: 'center', overflow: 'hidden', color: THEME.colors.WHITE, alignItems: 'flex-end', display: 'flex'}}>
           {device.id}
        </div>
      </div>
    )
  }

}


const localStyles = {
  tile: {
    overflow: 'hidden',
    padding: 20,
    borderRadius: 5,
    height: 250,
    width: 200,
    margin: 20,
    boxShadow: '0px 10px 30px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icon: {
    fontSize: 60,
    color: THEME.colors.WHITE
  }
};


function mapStateToProps(state, ownProps) {
  return {
    device: ownProps.device
  }
}

export default connect(
  mapStateToProps,
  {toggle}
)(Tile)