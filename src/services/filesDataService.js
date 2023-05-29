const axios = require("axios");
const {
    runSuccess
  } = require('../lib/parallel');

const fileListUrl = 'https://echo-serv.tbxnet.com/v1/secret/files';
const singleFileUrl = 'https://echo-serv.tbxnet.com/v1/secret/file';

const getSingleFile = async (fileName)=> {
    const headers = {
        headers: {
            authorization: 'Bearer aSuperSecretKey',
        },
      };
    
      const url = `${singleFileUrl}/${fileName}`
      const response = await axios.get(url, headers);
      if (response.status !== 200)
        throw { statusCode: response.status, error: "Request failed" };
      
      const fileContent = response.data;
      return fileContent;
}

const getFileList = async ()=>{
    const headers = {
        headers: {
            authorization: 'Bearer aSuperSecretKey',
        },
      };
    
      const response = await axios.get(fileListUrl, headers);
    
      if (response.status !== 200)
        throw { statusCode: response.status, error: "Request failed" };
    
      const {files} = response.data;

      return files;
}

const mapResultToFormat = (rawContent)=> {
    const fixedResult = [];
    rawContent.map((item)=> {
        const content = item.split('\n');
        if (content.length > 0) {
            content.shift();
            content.map((rawLine)=> {
                const line = rawLine.split(',').filter((i)=> i != '');
                if (line.length == 4){ //4 = file text number hex
                    if (fixedResult.findIndex((item)=> item.file == line[0]) >= 0) {
                        const index = fixedResult.findIndex((item)=> item.file == line[0])
                        fixedResult[index].lines.push(
                            {
                                text: line[1],
                                number: line[2],
                                hex: line[3]
                            }
                        )    
                    } else {
                        fixedResult.push({
                            file: line[0],
                            lines: [
                                {
                                    text: line[1],
                                    number: line[2],
                                    hex: line[3]
                                }
                            ]
                        })
                    }
                }
            })
        }
    })
    return fixedResult;
}

const getFilesContent = async (files)=>{

    const pipeline = [];
    files.map((fileName) => pipeline.push(getSingleFile(fileName)))
    const raw = await runSuccess(pipeline);

    const formattedResult = mapResultToFormat(raw);
    return formattedResult ;
}

const getFilesData = async () => {
  const files = await getFileList(); 
  const fileData = await getFilesContent(files);

  return fileData;
};

module.exports = {
    getFilesData,
    getSingleFile
};
