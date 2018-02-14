/**
 * Created by Emile_Bex on 27/11/2017.
 */

let updateTimeout = {};


const findDeviceIndex = (devices, id) => {
  return devices.findIndex((d) => {
    return d.id === id;
  });
};

const routes = (app, io, devices, updateDeviceList) => {

  const runUpdateTimeout = (device, index) => {
    updateTimeout[device.id] = setTimeout(() => {

      devices[index] = {
        ...devices[index],
        value: false,
        status: false
      };

      io.sockets.emit('action', {
        type: 'UPDATE',
        device: {
          ...device,
          status: false
        }
      });

      updateDeviceList(devices);

    }, 60000);
  };

  app.route('/').get((req, res) => {
  });

  app.route('/switch').post((req, res) => {
    let device = req.body;

    let index = findDeviceIndex(devices, device.id);

    devices[index] = {
      ...device
    };

    if(index > -1) {
      io.sockets.emit('action', {
        type: 'SWITCH',
        device: {
          ...device
        }
      });

      updateDeviceList(devices);

      res.status(200).end();
    }
    else {
      res.status(404).end();
    }
  });

  app.route('/update').post((req, res) => {
    let device = req.body;

    let index = findDeviceIndex(devices, device.id);

    if(index > -1) {

      clearTimeout(updateTimeout[device.id]);

      let lastUpdate = Date.now();

      devices[index] = {
        ...devices[index],
        ...device,
        lastUpdate: lastUpdate,
        status: true
      };

      io.sockets.emit('action', {
        type: 'UPDATE',
          device: {
            ...device,
            lastUpdate: lastUpdate,
            status: true
          },
      });

      updateDeviceList(devices);

      runUpdateTimeout(device, index);

      res.status(200).end();
    }
    else {
      res.status(404).end();
    }
  });
};

module.exports = routes;