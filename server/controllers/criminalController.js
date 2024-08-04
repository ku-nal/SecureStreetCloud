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

const AWS = require('aws-sdk');
const StatusCodes = require('http-status-codes');
const SuccessResponse = require('../utils/common/successResponse');
const ErrorResponse = require('../utils/common/errorResponse');

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: "",
    secretAccessKey: "",
    sessionToken: "",
    logger: console
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function createCriminal(req, res) {
    try {
        const { name, age, nationality, gender, objectKey } = req.body;

        console.log("I am here", req.body);
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

        console.log("_----------",params);

        await dynamoDb.put(params).promise();

        SuccessResponse.message = "Successfully inserted the criminal";
        SuccessResponse.data = params.Item;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getCriminalByObjKey(req, res) {
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
        console.log(error);
        ErrorResponse.error = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getCriminalById(req, res) {
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
            ErrorResponse.error = "No criminal found with that id";
            return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }

        SuccessResponse.message = "Successfully fetched the criminal";
        SuccessResponse.data = data.Item;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports = {
    createCriminal,
    getCriminalByObjKey,
    getCriminalById
};
