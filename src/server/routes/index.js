
const health = require('../controller/health');
const notFound = require('../controller/not-found');
const filesData = require('../controller/filesData');


//Bind path with route.
const bind = app => {
  
  app.get('/health', health);
  app.get('/files/data', filesData);
  app.get('*', notFound);

}

module.exports = {
  bind
};
