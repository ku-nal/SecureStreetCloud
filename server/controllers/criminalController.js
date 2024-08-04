// const Criminal = require('../models/criminal');
// const StatusCodes = require('http-status-codes');
// const SuccessResponse = require('../utils/common/successResponse');
// const ErrorResponse = require('../utils/common/errorResponse');

// async function createCriminal(req,res){
//     try{
//         const {name, age, nationality, gender, objectKey } = req.body;

//         const criminal = await Criminal.create({name, age, nationality, gender, objectKey});

//         SuccessResponse.message = "Successfully inserted the criminal";
//         SuccessResponse.data = criminal;

//         return res.status(StatusCodes.OK).json(SuccessResponse);
//     }
//     catch(error){
//         ErrorResponse.error = error.message;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
//     }
// }

// async function getCriminalByObjKey(req,res){
//     try{

//         console.log(req.query);
//         const {objectKey } = req.query;

//         const criminal = await Criminal.findOne({objectKey});

//         if(!criminal){
//             ErrorResponse.error = "No criminal found with that object key";
//             return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
//         }

//         SuccessResponse.message = "Successfully fetched the criminal";
//         SuccessResponse.data = criminal;

//         return res.status(StatusCodes.OK).json(SuccessResponse);
//     }
//     catch(error){
//         ErrorResponse.error = error.message;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
//     }
// }

// async function getCriminalById(req,res){
//     try{
//         const { id } = req.params.id;

//         const criminal = await Criminal.findById(id);

//         if(!criminal){
//             ErrorResponse.error = "No criminal found with that id";
//             return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
//         }

//         SuccessResponse.message = "Successfully fetched the criminal";
//         SuccessResponse.data = criminal;

//         return res.status(StatusCodes.OK).json(SuccessResponse);
//     }
//     catch(error){
//         ErrorResponse.error = error.message;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
//     }
// }


// module.exports = {
//     createCriminal,
//     getCriminalByObjKey,
//     getCriminalById
// }

// const AWS = require('aws-sdk');
// const StatusCodes = require('http-status-codes');
// const SuccessResponse = require('../utils/common/successResponse');
// const ErrorResponse = require('../utils/common/errorResponse');

// AWS.config.update({
//     region: 'us-east-1',
//     accessKeyId: "ASIAQL6BZ5JNBR7RUYXS",
//     secretAccessKey: "dXAHdwvpZMSv9R+UlmJxDQOlAYsOt25OaFPyQ9As",
//     sessionToken: "IQoJb3JpZ2luX2VjEN3//////////wEaCXVzLXdlc3QtMiJIMEYCIQDuE7ixUif4lgeTZ2r4wehG+/MmEUIiqo1n+O88/mvKPgIhAI253U80zuIhzMvEL9YRlRt4m1YphvHNtPABTYn8RHYlKrACCMX//////////wEQABoMMDI1NjM5MzgxNTk0IgwgQFZDnCFMWIKHnUYqhAJ5Hllh2LVyRAlVWvkaS8ugC9SdQUSVCwY4us6NJINbXfmQtsDz1rq6uhacDLtXRORyHf6xHNvlQTmzk3vk1/gBQ2U27eChEqk8vUipI3nN2MLeX1b+esaoTvKKKR2Jfz2t6b/x9SJE7nXi7zAEuUlLFGvCkgO15/I6QyycPEL93NTr84lMk/V4v8JWPpTLRzsO9BknCi11I3/CJlPIHjkSCQgmBQDgtQExurOZbe19ZqFGSf7wCpSxsMwgNxSkNyui1od0aogOGXj9jReBFxdtKnyO8DqJMysso0t6guD8eTPZZVH0seS1eOlVZ/jHC68WhCs0SpZp4eOQXpeHp4vRSgHDWDDLxL+1BjqcAR25WSKj3K2XdD5JNPrO7SrZpEYOLcE3jzbjxzpx9h6q5XznVIQyFfEOKYMkqiM1x719tBx160M1q3s+rf8c6CWTcFgLYhQyRINkfotVa5G0tv2DLumkAaicSAIy0Z0wBGIF2qol+1Sr7gIwk2z4Ycx82rqE5A2BpkK2HkDhxv5THUe+1T1+5O9CNc1uKcoMejEq3Xo2QRxh3p+Tbg==",
//     logger: console
// });

// const dynamoDb = new AWS.DynamoDB.DocumentClient();

// async function createCriminal(req, res) {
//     try {
//         const { name, age, nationality, gender, objectKey } = req.body;

//         console.log("I am here", req.body);
//         const params = {
//             TableName: 'Criminals',
//             Item: {
//                 criminalId: AWS.util.uuid.v4(), // Unique identifier for the criminal
//                 name,
//                 age,
//                 nationality,
//                 gender,
//                 objectKey,
//                 createdAt: new Date().toISOString()
//             }
//         };

//         console.log("_----------",params);

//         await dynamoDb.put(params).promise();

//         SuccessResponse.message = "Successfully inserted the criminal";
//         SuccessResponse.data = params.Item;

//         return res.status(StatusCodes.OK).json(SuccessResponse);
//     } catch (error) {
//         console.log(error);
//         ErrorResponse.error = error.message;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
//     }
// }

// async function getCriminalByObjKey(req, res) {
//     try {
//         const { objectKey } = req.query;

//         const params = {
//             TableName: 'Criminals',
//             FilterExpression: 'objectKey = :objectKey',
//             ExpressionAttributeValues: {
//                 ':objectKey': objectKey
//             }
//         };

//         const data = await dynamoDb.scan(params).promise();

//         if (data.Items.length === 0) {
//             ErrorResponse.error = "No criminal found with that object key";
//             return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
//         }

//         SuccessResponse.message = "Successfully fetched the criminal";
//         SuccessResponse.data = data.Items[0];

//         return res.status(StatusCodes.OK).json(SuccessResponse);
//     } catch (error) {
//         console.log(error);
//         ErrorResponse.error = error.message;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
//     }
// }

// async function getCriminalById(req, res) {
//     try {
//         const { id } = req.params;

//         const params = {
//             TableName: 'Criminals',
//             Key: {
//                 criminalId: id
//             }
//         };

//         const data = await dynamoDb.get(params).promise();

//         if (!data.Item) {
//             ErrorResponse.error = "No criminal found with that id";
//             return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
//         }

//         SuccessResponse.message = "Successfully fetched the criminal";
//         SuccessResponse.data = data.Item;

//         return res.status(StatusCodes.OK).json(SuccessResponse);
//     } catch (error) {
//         console.log(error);
//         ErrorResponse.error = error.message;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
//     }
// }

// module.exports = {
//     createCriminal,
//     getCriminalByObjKey,
//     getCriminalById
// };

// const AWS = require('aws-sdk');
// const StatusCodes = require('http-status-codes');
// const SuccessResponse = require('../utils/common/successResponse');
// const ErrorResponse = require('../utils/common/errorResponse');

// // Function to retrieve credentials from AWS Secrets Manager
// async function getAWSCredentials() {
//     const secretsManager = new AWS.SecretsManager({
//         region: 'us-east-1',
//     });

//     const params = {
//         SecretId: 'crimemanagement/secret', // Replace with your secret name
//     };

//     const secret = await secretsManager.getSecretValue(params).promise();
//     return JSON.parse(secret.SecretString);
// }

// (async () => {
//     try {
//         const credentials = await getAWSCredentials();
        
//         AWS.config.update({
//             region: 'us-east-1',
//             accessKeyId: credentials.accessKeyId,
//             secretAccessKey: credentials.secretAccessKey,
//             sessionToken: credentials.sessionToken,
//             logger: console,
//         });
//     } catch (error) {
//         console.error('Failed to retrieve AWS credentials:', error.message);
//     }
// })();

// const dynamoDb = new AWS.DynamoDB.DocumentClient();

// async function createCriminal(req, res) {
//     try {
//         const { name, age, nationality, gender, objectKey } = req.body;

//         console.log("I am here", req.body);
//         const params = {
//             TableName: 'Criminals',
//             Item: {
//                 criminalId: AWS.util.uuid.v4(), // Unique identifier for the criminal
//                 name,
//                 age,
//                 nationality,
//                 gender,
//                 objectKey,
//                 createdAt: new Date().toISOString()
//             }
//         };

//         console.log("_----------", params);

//         await dynamoDb.put(params).promise();

//         SuccessResponse.message = "Successfully inserted the criminal";
//         SuccessResponse.data = params.Item;

//         return res.status(StatusCodes.OK).json(SuccessResponse);
//     } catch (error) {
//         console.log(error);
//         ErrorResponse.error = error.message;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
//     }
// }

// async function getCriminalByObjKey(req, res) {
//     try {
//         const { objectKey } = req.query;

//         const params = {
//             TableName: 'Criminals',
//             FilterExpression: 'objectKey = :objectKey',
//             ExpressionAttributeValues: {
//                 ':objectKey': objectKey
//             }
//         };

//         const data = await dynamoDb.scan(params).promise();

//         if (data.Items.length === 0) {
//             ErrorResponse.error = "No criminal found with that object key";
//             return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
//         }

//         SuccessResponse.message = "Successfully fetched the criminal";
//         SuccessResponse.data = data.Items[0];

//         return res.status(StatusCodes.OK).json(SuccessResponse);
//     } catch (error) {
//         console.log(error);
//         ErrorResponse.error = error.message;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
//     }
// }

// async function getCriminalById(req, res) {
//     try {
//         const { id } = req.params;

//         const params = {
//             TableName: 'Criminals',
//             Key: {
//                 criminalId: id
//             }
//         };

//         const data = await dynamoDb.get(params).promise();

//         if (!data.Item) {
//             ErrorResponse.error = "No criminal found with that id";
//             return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
//         }

//         SuccessResponse.message = "Successfully fetched the criminal";
//         SuccessResponse.data = data.Item;

//         return res.status(StatusCodes.OK).json(SuccessResponse);
//     } catch (error) {
//         console.log(error);
//         ErrorResponse.error = error.message;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
//     }
// }

// module.exports = {
//     createCriminal,
//     getCriminalByObjKey,
//     getCriminalById
// };

// const AWS = require('aws-sdk');
// const StatusCodes = require('http-status-codes');
// const SuccessResponse = require('../utils/common/successResponse');
// const ErrorResponse = require('../utils/common/errorResponse');

// // Function to retrieve credentials from AWS Secrets Manager
// async function getAWSCredentials() {
//     const secretsManager = new AWS.SecretsManager({
//         region: 'us-east-1',
//     });

//     const params = {
//         SecretId: 'crimemanagement/secret', // Replace with your secret name
//     };

//     const secret = await secretsManager.getSecretValue(params).promise();
//     return JSON.parse(secret.SecretString);
// }

// // Initialize AWS SDK
// async function initializeAWS() {
//     try {
//         const credentials = await getAWSCredentials();
        
//         AWS.config.update({
//             region: 'us-east-1',
//             accessKeyId: credentials.accessKeyId,
//             secretAccessKey: credentials.secretAccessKey,
//             sessionToken: credentials.sessionToken,
//             logger: console,
//         });

//         return new AWS.DynamoDB.DocumentClient(); // Return the initialized client
//     } catch (error) {
//         console.error('Failed to retrieve AWS credentials:', error.message);
//         throw error; // Re-throw error for proper error handling
//     }
// }

// // Initialize DynamoDB DocumentClient
// let dynamoDb;

// (async () => {
//     try {
//         dynamoDb = await initializeAWS(); // Ensure AWS SDK is configured before using it
//     } catch (error) {
//         console.error('Error initializing AWS SDK:', error.message);
//         process.exit(1); // Exit process if AWS initialization fails
//     }
// })();

// async function createCriminal(req, res) {
//     try {
//         const { name, age, nationality, gender, objectKey } = req.body;

//         console.log("I am here", req.body);
//         const params = {
//             TableName: 'Criminals',
//             Item: {
//                 criminalId: AWS.util.uuid.v4(), // Unique identifier for the criminal
//                 name,
//                 age,
//                 nationality,
//                 gender,
//                 objectKey,
//                 createdAt: new Date().toISOString()
//             }
//         };

//         console.log("_----------", params);

//         await dynamoDb.put(params).promise();

//         SuccessResponse.message = "Successfully inserted the criminal";
//         SuccessResponse.data = params.Item;

//         return res.status(StatusCodes.OK).json(SuccessResponse);
//     } catch (error) {
//         console.log(error);
//         ErrorResponse.error = error.message;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
//     }
// }

// async function getCriminalByObjKey(req, res) {
//     try {
//         const { objectKey } = req.query;

//         const params = {
//             TableName: 'Criminals',
//             FilterExpression: 'objectKey = :objectKey',
//             ExpressionAttributeValues: {
//                 ':objectKey': objectKey
//             }
//         };

//         const data = await dynamoDb.scan(params).promise();

//         if (data.Items.length === 0) {
//             ErrorResponse.error = "No criminal found with that object key";
//             return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
//         }

//         SuccessResponse.message = "Successfully fetched the criminal";
//         SuccessResponse.data = data.Items[0];

//         return res.status(StatusCodes.OK).json(SuccessResponse);
//     } catch (error) {
//         console.log(error);
//         ErrorResponse.error = error.message;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
//     }
// }

// async function getCriminalById(req, res) {
//     try {
//         const { id } = req.params;

//         const params = {
//             TableName: 'Criminals',
//             Key: {
//                 criminalId: id
//             }
//         };

//         const data = await dynamoDb.get(params).promise();

//         if (!data.Item) {
//             ErrorResponse.error = "No criminal found with that id";
//             return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
//         }

//         SuccessResponse.message = "Successfully fetched the criminal";
//         SuccessResponse.data = data.Item;

//         return res.status(StatusCodes.OK).json(SuccessResponse);
//     } catch (error) {
//         console.log(error);
//         ErrorResponse.error = error.message;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
//     }
// }

// module.exports = {
//     createCriminal,
//     getCriminalByObjKey,
//     getCriminalById
// };


const AWS = require('aws-sdk');
const StatusCodes = require('http-status-codes');
const SuccessResponse = require('../utils/common/successResponse');
const ErrorResponse = require('../utils/common/errorResponse');

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

// Initialize AWS SDK
async function initializeAWS() {
    try {
        const credentials = await getAWSCredentials();

        AWS.config.update({
            region: 'us-east-1',
            accessKeyId: credentials.accessKeyId,
            secretAccessKey: credentials.secretAccessKey,
            sessionToken: credentials.sessionToken,
            logger: console,
        });

        return new AWS.DynamoDB.DocumentClient(); // Return the initialized client
    } catch (error) {
        console.error('Error initializing AWS SDK:', error.message);
        throw error; // Re-throw error for proper error handling
    }
}

// Initialize DynamoDB DocumentClient
let dynamoDb;

(async () => {
    try {
        dynamoDb = await initializeAWS(); // Ensure AWS SDK is configured before using it
    } catch (error) {
        console.error('Error initializing AWS SDK:', error.message);
        process.exit(1); // Exit process if AWS initialization fails
    }
})();

// Create a criminal entry
async function createCriminal(req, res) {
    if (!dynamoDb) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: 'DynamoDB client not initialized'
        });
    }

    try {
        const { name, age, nationality, gender, objectKey } = req.body;

        console.log("Creating criminal entry:", req.body);
        const params = {
            TableName: 'Criminals',
            Item: {
                criminalId: AWS.util.uuid.v4(), // Unique identifier for the criminal
                name,
                age,
                nationality,
                gender,
                objectKey,
                createdAt: new Date().toISOString()
            }
        };

        console.log("Parameters for DynamoDB put:", params);

        await dynamoDb.put(params).promise();

        SuccessResponse.message = "Successfully inserted the criminal";
        SuccessResponse.data = params.Item;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.error('Error creating criminal:', error.message);
        ErrorResponse.error = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

// Retrieve a criminal by object key
async function getCriminalByObjKey(req, res) {
    if (!dynamoDb) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: 'DynamoDB client not initialized'
        });
    }

    try {
        const { objectKey } = req.query;

        const params = {
            TableName: 'Criminals',
            FilterExpression: 'objectKey = :objectKey',
            ExpressionAttributeValues: {
                ':objectKey': objectKey
            }
        };

        const data = await dynamoDb.scan(params).promise();

        if (data.Items.length === 0) {
            ErrorResponse.error = "No criminal found with that object key";
            return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }

        SuccessResponse.message = "Successfully fetched the criminal";
        SuccessResponse.data = data.Items[0];

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.error('Error fetching criminal by object key:', error.message);
        ErrorResponse.error = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

// Retrieve a criminal by ID
async function getCriminalById(req, res) {
    if (!dynamoDb) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: 'DynamoDB client not initialized'
        });
    }

    try {
        const { id } = req.params;

        const params = {
            TableName: 'Criminals',
            Key: {
                criminalId: id
            }
        };

        const data = await dynamoDb.get(params).promise();

        if (!data.Item) {
            ErrorResponse.error = "No criminal found with that ID";
            return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }

        SuccessResponse.message = "Successfully fetched the criminal";
        SuccessResponse.data = data.Item;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.error('Error fetching criminal by ID:', error.message);
        ErrorResponse.error = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports = {
    createCriminal,
    getCriminalByObjKey,
    getCriminalById
};
