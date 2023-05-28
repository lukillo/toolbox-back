
/*
    Tranform a promise result in a structure with one error flag.
    Params
      method: string,
      body, headers: object
    Return
      object
*/
const toResult = (promise) => {
    return promise
        .then(result => ({ success: true,  body: result }))
        .catch(error => ({ success: false, body: error }));
  };
  

/*
    Run a promise array and get all the results, without finish when produces an exception.
    Params
      [Promise]
    Return
      [{sucess:boolean,object}]
*/
const runAll = promList => Promise.all(promList.map(toResult));

/*
    Run in parallel a promise array, but get only the succefull results.
    Params
      [Promise]
    Return
      [{object}]
*/
const runSuccess = async (promises) => {

    return (await runAll(promises))
      .filter(resu => resu.success)
      .map(elem => elem.body);
  
  }

  module.exports = {
    toResult,
    runAll,
    runSuccess
  }