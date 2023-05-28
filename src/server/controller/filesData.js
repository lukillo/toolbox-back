const {
    getFilesData
  } = require('../../services/filesDataService.js');

const filesData = async (req,res, next)=>{ 
    try {
      const files = await getFilesData();
      return res.status(200).json(files);
    } catch (error) {
      next(error);
    }
  }
  
  module.exports = filesData