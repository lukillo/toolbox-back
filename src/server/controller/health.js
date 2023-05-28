const health = (req,res, next)=>{ 
    try {
      console.info({url: req.url, method: req.method, message:`Health request`});
      res.status(200).json({"health":"OK"});
    } catch (error) {
      next(error);
    }
  }
  
  module.exports = health