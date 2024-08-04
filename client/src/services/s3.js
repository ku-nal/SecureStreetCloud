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

const AWS = require('aws-sdk');

// Function to retrieve credentials from AWS Secrets Manager
async function getAWSCredentials() {
    const secretsManager = new AWS.SecretsManager({
        region: 'us-east-1',
    });

    const params = {
        SecretId: 'crimemanagement/secret', // Replace with your secret name
    };

    try {
        const secret = await secretsManager.getSecretValue(params).promise();
        return JSON.parse(secret.SecretString);
    } catch (error) {
        console.error('Failed to retrieve AWS credentials:', error.message);
        throw error; // Re-throw error for proper error handling
    }
}

// Initialize S3 client with credentials from Secrets Manager
async function initializeS3() {
    try {
        const credentials = await getAWSCredentials();

        const S3 = new AWS.S3({
            accessKeyId: credentials.accessKeyId,
            secretAccessKey: credentials.secretAccessKey,
            sessionToken: credentials.sessionToken,
            region: 'us-east-1',
            logger: console,
        });

        console.log('Successfully initialized S3 client');
        return S3;
    } catch (error) {
        console.error('Error initializing S3 client:', error.message);
        throw error; // Re-throw error for proper error handling
    }
}

// Initialize S3 client and test it
let S3;

(async () => {
    try {
        S3 = await initializeS3(); // Ensure S3 client is configured before using it

        // Test S3 client by listing buckets
        const data = await S3.listBuckets().promise();
        console.log('Buckets:', data.Buckets);
    } catch (error) {
        console.error('Error initializing or using S3 client:', error.message);
    }
})();

module.exports = S3;

