import AWS from 'aws-sdk';

const S3 = new AWS.S3({
  accessKeyId: "",
  secretAccessKey: "",
  sessionToken: ""
});

export default S3;