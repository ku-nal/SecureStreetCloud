// const Report = require('../models/report');
// const StatusCodes = require('http-status-codes');
// const SuccessResponse = require('../utils/common/successResponse');
// const ErrorResponse = require('../utils/common/errorResponse');

// async function createReport(req,res){
//     try{
//         console.log(req.body);
//         const {description, type, date, criminalId, firKey } = req.body;

//         const criminal = await Report.create({description, type, date, criminalId, firKey});

//         SuccessResponse.message = "Successfully inserted the criminal";
//         SuccessResponse.data = criminal;

//         return res.status(StatusCodes.OK).json(SuccessResponse);
//     }
//     catch(error){
//         console.log(error);
//         ErrorResponse.error = error.message;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
//     }
// }

// async function getReportByCriminalId(req,res){
//     try{
//         const { criminalId } = req.body;

//         const reports = await Report.find({criminalId});

//         if(!reports){
//             ErrorResponse.error = "No Report found with that Criminal Id";
//             return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
//         }

//         SuccessResponse.message = "Successfully fetched the Reports for the criminal";
//         SuccessResponse.data = reports;

//         return res.status(StatusCodes.OK).json(SuccessResponse);
//     }
//     catch(error){
//         ErrorResponse.error = error.message;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
//     }
// }

// async function getReportById(req,res){
//     try{
//         const { id } = req.params.id;

//         const report = await Report.findById(id);

//         if(!report){
//             ErrorResponse.error = "No Report found with that report id";
//             return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
//         }

//         SuccessResponse.message = "Successfully fetched the Report for that report id";
//         SuccessResponse.data = report;

//         return res.status(StatusCodes.OK).json(SuccessResponse);
//     }
//     catch(error){
//         ErrorResponse.error = error.message;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
//     }
// }

// module.exports = {
//     createReport,
//     getReportByCriminalId,
//     getReportById
// }


// const AWS = require('aws-sdk');
// const StatusCodes = require('http-status-codes');
// const SuccessResponse = require('../utils/common/successResponse');
// const ErrorResponse = require('../utils/common/errorResponse');

// AWS.config.update({
//     region: 'us-east-1',
//     accessKeyId: "",
//     secretAccessKey: "",
//     sessionToken: "",
//     logger: console
// });

// const dynamoDb = new AWS.DynamoDB.DocumentClient();

// async function createReport(req, res) {
//     try {
//         console.log(req.body);  
//         const { description, type, date, criminalId, firKey } = req.body;

//         const params = {
//             TableName: 'Report',
//             Item: {
//                 criminalId, // Partition key
//                 reportId: AWS.util.uuid.v4(), // Unique identifier for the report (sort key)
//                 description,
//                 type,
//                 date,
//                 firKey,
//                 createdAt: new Date().toISOString()
//             }
//         };

//         await dynamoDb.put(params).promise();

//         SuccessResponse.message = "Successfully inserted the criminal report";
//         SuccessResponse.data = params.Item;

//         return res.status(StatusCodes.OK).json(SuccessResponse);
//     } catch (error) {
//         console.log(error);
//         ErrorResponse.error = error.message;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
//     }
// }

// async function getReportByCriminalId(req, res) {
//     try {
//         const { criminalId } = req.body;

//         const params = {
//             TableName: 'Report',
//             KeyConditionExpression: 'criminalId = :criminalId',
//             ExpressionAttributeValues: {
//                 ':criminalId': criminalId
//             }
//         };

//         const data = await dynamoDb.query(params).promise();

//         if (data.Items.length === 0) {
//             ErrorResponse.error = "No Report found with that Criminal Id";
//             return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
//         }

//         SuccessResponse.message = "Successfully fetched the Reports for the criminal";
//         SuccessResponse.data = data.Items;

//         return res.status(StatusCodes.OK).json(SuccessResponse);
//     } catch (error) {
//         console.log(error);
//         ErrorResponse.error = error.message;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
//     }
// }

// async function getReportById(req, res) {
//     try {
//         const { criminalId, reportId } = req.body; // Use both criminalId and reportId

//         const params = {
//             TableName: 'Report',
//             Key: {
//                 criminalId, // Partition key
//                 reportId // Sort key
//             }
//         };

//         const data = await dynamoDb.get(params).promise();

//         if (!data.Item) {
//             ErrorResponse.error = "No Report found with that report id";
//             return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
//         }

//         SuccessResponse.message = "Successfully fetched the Report for that report id";
//         SuccessResponse.data = data.Item;

//         return res.status(StatusCodes.OK).json(SuccessResponse);
//     } catch (error) {
//         console.log(error);
//         ErrorResponse.error = error.message;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
//     }
// }

// module.exports = {
//     createReport,
//     getReportByCriminalId,
//     getReportById
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

// Initialize AWS SDK with credentials from Secrets Manager
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

async function createReport(req, res) {
    try {
        console.log(req.body);  
        const { description, type, date, criminalId, firKey } = req.body;

        const params = {
            TableName: 'Report',
            Item: {
                criminalId, // Partition key
                reportId: AWS.util.uuid.v4(), // Unique identifier for the report (sort key)
                description,
                type,
                date,
                firKey,
                createdAt: new Date().toISOString()
            }
        };

        await dynamoDb.put(params).promise();

        SuccessResponse.message = "Successfully inserted the criminal report";
        SuccessResponse.data = params.Item;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getReportByCriminalId(req, res) {
    try {
        const { criminalId } = req.body;

        const params = {
            TableName: 'Report',
            KeyConditionExpression: 'criminalId = :criminalId',
            ExpressionAttributeValues: {
                ':criminalId': criminalId
            }
        };

        const data = await dynamoDb.query(params).promise();

        if (data.Items.length === 0) {
            ErrorResponse.error = "No Report found with that Criminal Id";
            return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }

        SuccessResponse.message = "Successfully fetched the Reports for the criminal";
        SuccessResponse.data = data.Items;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getReportById(req, res) {
    try {
        const { criminalId, reportId } = req.body; // Use both criminalId and reportId

        const params = {
            TableName: 'Report',
            Key: {
                criminalId, // Partition key
                reportId // Sort key
            }
        };

        const data = await dynamoDb.get(params).promise();

        if (!data.Item) {
            ErrorResponse.error = "No Report found with that report id";
            return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }

        SuccessResponse.message = "Successfully fetched the Report for that report id";
        SuccessResponse.data = data.Item;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports = {
    createReport,
    getReportByCriminalId,
    getReportById
};

