// import AWS from 'aws-sdk';

// // Function to retrieve credentials from AWS Secrets Manager
// async function getAWSCredentials() {
//     const secretsManager = new AWS.SecretsManager({
//         region: 'us-east-1',
//     });

//     const params = {
//         SecretId: 'crimemanagement/secret', // Replace with your secret name
//     };

//     try {
//         const secret = await secretsManager.getSecretValue(params).promise();
//         return JSON.parse(secret.SecretString);
//     } catch (error) {
//         console.error('Failed to retrieve AWS credentials:', error.message);
//         throw error; // Re-throw error for proper error handling
//     }
// }

// // Initialize S3 client with credentials from Secrets Manager
// async function initializeS3() {
//     try {
//         const credentials = await getAWSCredentials();

//         const S3 = new AWS.S3({
//             accessKeyId: credentials.accessKeyId,
//             secretAccessKey: credentials.secretAccessKey,
//             sessionToken: credentials.sessionToken,
//             region: 'us-east-1',
//         });

//         console.log('Successfully initialized S3 client');
//         return S3;
//     } catch (error) {
//         console.error('Error initializing S3 client:', error.message);
//         throw error; // Re-throw error for proper error handling
//     }
// }

// // Initialize S3 client and export
// let S3;

// (async () => {
//     try {
//         S3 = await initializeS3();
//     } catch (error) {
//         console.error('Error initializing S3 client:', error.message);
//         process.exit(1); // Exit process if S3 initialization fails
//     }
// })();

// export default S3;

// import AWS from 'aws-sdk';

// // Initialize S3 client using IAM role credentials
// const S3 = new AWS.S3({
//     region: 'us-east-1', // Specify your AWS region
//     logger: console,
// });

// console.log('Successfully initialized S3 client');

// // Test S3 client with a basic operation
// (async () => {
//     try {
//         const data = await S3.listBuckets().promise();
//         console.log('Buckets:', data.Buckets);
//     } catch (error) {
//         console.error('Error listing buckets:', error.message);
//     }
// })();

// export default S3;

// const AWS = require('aws-sdk');

// // Function to retrieve credentials from AWS Secrets Manager
// async function getAWSCredentials() {
//     const secretsManager = new AWS.SecretsManager({
//         region: 'us-east-1',
//     });

//     const params = {
//         SecretId: 'crimemanagement/secret', // Replace with your secret name
//     };

//     try {
//         const secret = await secretsManager.getSecretValue(params).promise();
//         return JSON.parse(secret.SecretString);
//     } catch (error) {
//         console.error('Failed to retrieve AWS credentials:', error.message);
//         throw error; // Re-throw error for proper error handling
//     }
// }

// // Initialize S3 client with credentials from Secrets Manager
// async function initializeS3() {
//     try {
//         const credentials = await getAWSCredentials();
        
//         const S3 = new AWS.S3({
//             accessKeyId: credentials.accessKeyId,
//             secretAccessKey: credentials.secretAccessKey,
//             sessionToken: credentials.sessionToken,
//             region: 'us-east-1',
//             logger: console,
//         });

//         console.log('Successfully initialized S3 client');
//         return S3;
//     } catch (error) {
//         console.error('Error initializing S3 client:', error.message);
//         throw error; // Re-throw error for proper error handling
//     }
// }

// Initialize S3 client and test it
// (async () => {
//     try {
//         const S3 = await initializeS3(); // Ensure S3 client is configured before using it

//         // Test S3 client by listing buckets
//         const data = await S3.listBuckets().promise();
//         console.log('Buckets:', data.Buckets);
//     } catch (error) {
//         console.error('Error initializing or using S3 client:', error.message);
//     }
// })();

import AWS from 'aws-sdk';

const S3 = new AWS.S3({
  accessKeyId: "ASIAQL6BZ5JNLMRNFM2P",
  secretAccessKey: "3vfqtRrBVjyjOAtkSa5dSiHtP6mHt1Xlnx97ErMJ",
  sessionToken: "IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJHMEUCIAxYjHfiqjBN4TqZL0W1l4JZnOvFCaoEiG8KEmXILPEbAiEA0/ao/KxIYGjqrWxutKBCYIpmF65RuBceVaYqVk0hpQUqsAII7v//////////ARAAGgwwMjU2MzkzODE1OTQiDLQZ5jnmcXq//YNlLCqEAnfHIe78BVNvvog+yT2JcD1A5WXEdBRmND/H09nrLXj5Zu06PVrxEUoCmr7Vo07bB8GE86pKlT75kdUCKXB8og8s3DaZKRBjeiDCFzJHFsE0O1QnxpUne4uDVrGbMiyGbaND4FDSLqISmUhmdfgqYcimtJ368/HeemSs4ZqhpbOGIaHNEFbFkLdRXNcHJiw04gkWGcMUqnV57gk2WWc6wSCYPFCvE3n2RwDvRi4SX6Zd2jdoe+I3eeRhObxwMBI+PC1SL+e3+7/Ale5aTPVZZZGelWLKHhTPSwNoPnTHgnez18emrewaL0LBbMbU1BW/fJ3RRx9rLo7QUrRWoNXvSN63fZUbMPeuyLUGOp0BheP2kc4dAuWKAjHbGOjKFQQqvOervJxRJeZrgiGhEeaOXIef3YuWzlmjknRffrzrE1io3XIw0ZseUImOVmfGd+pILvtu2nWBWXzp8qck5iZxKicysSWe4p2pT9JHg0psX2NDBkl0UhreXwzZG9VaQ3lKOaaNY7Y1fW8ghIathKh6BhiO89LGuQCavDMXS7NPhjxTSah75WOo5hVOPA=="
});

export default S3;

// import AWS from 'aws-sdk';

// // Create a Secrets Manager client
// const secretsManager = new AWS.SecretsManager({ region: 'us-east-1' }); // Replace with your region

// async function getSecretValue(secretName) {
//   try {
//     const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
//     if ('SecretString' in data) {
//       return JSON.parse(data.SecretString);
//     } else {
//       const buff = Buffer.from(data.SecretBinary, 'base64');
//       return JSON.parse(buff.toString('ascii'));
//     }
//   } catch (err) {
//     console.error('Error retrieving secret:', err);
//     throw err;
//   }
// }

// const createS3Client = async () => {
//   try {
//     const secretName = 'crimemanagement/secret'; // Replace with your secret name
//     const secret = await getSecretValue(secretName);

//     return new AWS.S3({
//       accessKeyId: secret.accessKeyId,
//       secretAccessKey: secret.secretAccessKey,
//       sessionToken: secret.sessionToken, // Optional
//     });
//   } catch (err) {
//     console.error('Error configuring S3 client:', err);
//     throw err;
//   }
// };

// export default createS3Client;
