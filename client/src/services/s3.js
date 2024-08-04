import AWS from 'aws-sdk';

// Configure AWS SDK to use the default region and log output
AWS.config.update({
    region: 'us-east-1',
    logger: console,
});

// Initialize S3 client
const S3 = new AWS.S3();

// Log a message indicating successful initialization
console.log('Successfully initialized S3 client');

// Export the S3 client
export default S3;
