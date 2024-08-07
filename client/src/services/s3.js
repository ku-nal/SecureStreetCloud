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
  accessKeyId: "ASIA6KO3ERVB66F7G2GX",
  secretAccessKey: "yssDkz4k2ckSLzuFFs3jKwDbpYROM7qsfRpg5YiH",
  sessionToken: "IQoJb3JpZ2luX2VjEB8aCXVzLXdlc3QtMiJGMEQCIDOc+QtnbEAi5nDlWaztfcPUwDkvVDUnsKjlVne4waiYAiB70RaJBxpoRjqdAx4OKgUT7tz5Jl+4/VehYyRcBdr8ISqnAggYEAAaDDk4NDU0Mzk1NjI5MSIMoXL/Ol184YXA672sKoQCzHbW6OZJ3aWZlJWQCENYff7uvSOgSShX3Yzj7Nu9JBs3Vm8Vt47lDv1oZgy0FOBifgKcnePJsgv55HI8gsjjEhP/sDlJuVFTKWpd+fMCNgYgXFfC7zLp4W1MbLlv3GeDZmcpeKoy6TS0pFT5OcpX5A63Q4Tvs1bV9mwb9j8fdvonPAqejfjnWtn2puOLzaG6hibzNZh1Bo6ARpgqme3UQIlyW6F9Z5QvaFQJzlFhU1B2qT97l75vog7qgMvCCkPbd+4GZxRSxDFZC35XZSQ2K52oDifm5CuBdxNqA9tot3MQvignOJY31n9pRQ88TMPVLwMcOXzrec5Fl759UlbdBIceiCswnJXOtQY6ngFbrr9KQ87PFc5eVSgV02zMwZSg3Dm86Tu8wbeDj87tQQhbftfGCui0dH8Q6k7wyrzBpWgQQo7ivt4iclvXzAHsSQhy5sRQG/Ru/RpLGkQw2G9OXZu6Z1cRPsmqPYpXp7g3hKg7HPxZGiTq9D5+/I6Ym5f7g8nqzGRYIWAYzcnhlrkHCTe6CF7hh6/i6SsX75sD7GTbG3OHVdgE/+Ku4w=="
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
