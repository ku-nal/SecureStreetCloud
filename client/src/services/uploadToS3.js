import S3 from './s3';

const uploadFile = async (fileName, bucketName, fileContent) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: "crimeb00961220cloud",
      Key: fileName,
      Body: fileContent,
    };

    S3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading file:", err);
        reject(err);
      } else {
        console.log(`File uploaded successfully. ${data.Location}`);
        resolve(params.Key);
      }
    });
  });
};

export default uploadFile;

// import axios from 'axios';

// const uploadFile = async (fileName, bucketName, fileContent) => {
//   const payload = {
//     fileName,
//     bucketName,
//     fileContent: fileContent.toString('base64'), // Convert file content to base64
//   };

//   try {
//     const response = await axios.post('', payload);
//     return response.data.Location;
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     throw error;
//   }
// };

// export default uploadFile;
