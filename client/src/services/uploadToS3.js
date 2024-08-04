import S3 from './s3';

const uploadFile = async (fileName, bucketName, fileContent) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: "crimeb00961220",
      Key: fileName,
      Body: fileContent,
    };

    console.log(S3);

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
