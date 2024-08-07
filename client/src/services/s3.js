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
  accessKeyId: "ASIAQL6BZ5JNKIWZCBUF",
  secretAccessKey: "1gccTrgdFETK61gwsc40zxxklS46EcHwwEeuTqmX",
  sessionToken: "IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJHMEUCIBPm4Tba2E9CMJym36jf6rJ2r20aq/X1YUu76rxXSI6zAiEA/o4uMbfZwNpYZyhsefr2yC2avi+go8nW4tM3vE6VwWgqpwIIFBAAGgwwMjU2MzkzODE1OTQiDJvKVyHA164JgR46mSqEAhHJJbNVsRPUEOT5z4j6wxpnnb8rBs29oJ82DCJmJR1+eNLtgX+B8oazIKzy7zgYLOfVyngFlFUYiknD6E7r/FkdX8M3koz4sJl8clgldD2r+V0NMM4QmCrMiZWC+Vv9e326RMR0gAl3VJAIxiOey4P5FrwY0L1ywBm/wFmV//ZgkSVDiLQ4XrqQznD2d4wLcZgRG1/Y0Ucag16858Qnm05NYfNlI5GOyn2XUedGWCWpI4TbyRQjnbALo6VWJysUC7Q6j+LXicHrigRjX9+hX7wt9t3JUaTrMBISUVhwcZSGTM4W9lfdK4dYv1qTzPan+4os73bD6kvC0R/DhakhKG2HXmxKMLyxzbUGOp0BuGJlNpbDrDG/gOzXJHqf1Kr5eKJoE8GoD08UMrpm9I/96Mue/SPr1c6IQvl13Cs6iw1FRaVryEsVvi4ZGY2wF4ut7tisWKdaoXBIgLZOlin+6hGmb4r0GgExP5et24/jfy+W3oSSWt1GeKUUoELmfXp8XtBiAoF/0VNDQZEkelfutuxKrcNnI/mwHJu874h0m96jrbLGqAQUm/d/5Q=="
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
