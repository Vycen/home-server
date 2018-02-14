/*
 import {} from '../services/WebServices';
 import {} from '../actions';

 import {  } from "../constants";
 */

let devices;

let findDeviceIndex = (devices, id) => {
  return devices.findIndex((d) => {
    return d.id === id
  });
};

const iot = require('../data/iot.json');

const reducer = (state, action) => {

  if (!state) {
    state = {
      devices: iot
    };
  }

  switch (action.type) {

    case 'INIT':

      return {
        ...state,
        devices: [
          ...action.devices
        ]
      };

    case 'SWITCH':
    case 'SERVER/TOGGLE':

      devices = state.devices;

      let value = devices[findDeviceIndex(devices, action.device.id)].value;

      devices[findDeviceIndex(devices, action.device.id)].value = !value;

      return {
        ...state,
        devices: [
          ...devices
        ]
      };

    case 'UPDATE':

      devices = state.devices;

      if(findDeviceIndex(devices, action.device.id) > -1) {
        if(action.lastUpdate) {
          devices[findDeviceIndex(devices, action.device.id)].lastUpdate = action.device.lastUpdate;
        }
        devices[findDeviceIndex(devices, action.device.id)].value = action.device.value;
        devices[findDeviceIndex(devices, action.device.id)].status = action.device.status;
      }

      return {
        ...state,
        devices: [
          ...devices
        ]
      };


    default :
      return {
        ...state
      };
  }
};


export default reducer;