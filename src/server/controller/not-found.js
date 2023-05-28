
const notFound = (req,res)=>{
  console.info({url: req.url, method: req.method, message:`Not found`});
   res.status(404).json({"error":"Route not found."});

}

module.exports = notFound;