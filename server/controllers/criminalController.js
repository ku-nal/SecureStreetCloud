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

// AWS.config.update({
//     region: 'us-east-1',
//     accessKeyId: "ASIAQL6BZ5JNHB2UQPPU",
//     secretAccessKey: "/Mvxm4p8bGXrs7zIHMAd0X4Fq0oqhL8AmkZH6XZF",
//     sessionToken: "IQoJb3JpZ2luX2VjEML//////////wEaCXVzLXdlc3QtMiJHMEUCIQCnf7KdJuf9HRmZWRzs0ugiyjPgl+eP8O8pKGGozGORGgIgKcEjzFJzIGYUQ8rR5Ef2FTUSAVMJUG2e8XjKkLQBA2IqsAIIq///////////ARAAGgwwMjU2MzkzODE1OTQiDAc/5KcJj15vkkyNQSqEAveVnySfOrBRKixLinhZe0RWUEUmFHVSR75XlkrA7G3ARi2yvoeycpjeXhWW0hL82qU90Fqpn34UHtr9PahNvnl9jyZML9wwhdubCZyWHVHaySng/OC8TYoBPRPUaECFfYtaOv95ls2qRsdR9TWJxY1xfWb7Q7o/aksdPqe6KN5CN05LYzJ4SVK+VtLImnYAl6VN2wcyNbR4uAj4ZdK6Dfh7WXQpNfo7ey3jetpvYneSwcF0ocx8b6X8zvX8KFgZdPEi5Z3hvQkCNP8ok9TFlfobUx9n59eGinD5fIGIzjKkF8jkm1TEq2HDzqUyKcnlgUHobeN346pDd8ltWk3N6TlWM9FVMMveubUGOp0BDilshPLwL/WyRgnljdhYDEsNZdcDmPl6trgjHjLAji4V13XmqmgeV0QPajOe9oX3T8nM54+aH93nFQxfbRvhcZ6VUwonAltagqJR7LggiDwzpW7ArVsuGsE3DE/3cK8Xo0X2fJXMrqpMJ15lwK4rZX+HcH2mcDcQEFK9e4PFSo45TbgXbLFQOUbPhnrLyROivdfJxtKFrHefnigWfg==",
//     logger: console
// });

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
