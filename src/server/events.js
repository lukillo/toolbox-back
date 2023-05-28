const process = require('process');
const pkg     = require('../../package.json');

const killTimeout = 5000; //miliseconds

//On server internal error.
const onServerError = ()=>console.error({message:`Server error`});

//On server start.
const onListen = (port)=>{

  console.info(`ᕕ(ಠ‿ಠ)ᕗ ${pkg.name}`);
  console.info(`${pkg.name}:${pkg.version} - Running on port: ${port}`);
  
}

//When the process receive kill signal.
const onProcessKill = server =>{
  
  console.info('Service termination signal received');
  
  setTimeout(() => {

    console.info('Finishing server');
    server.close(()=>process.exit(0));

  }, killTimeout);

}

//When in the server happen a uncaugth exception.
const onException = err =>console.error({message:err});

module.exports = {
  onListen,
  onProcessKill,
  onServerError,
  onException
};