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


const AWS = require('aws-sdk');
const StatusCodes = require('http-status-codes');
const SuccessResponse = require('../utils/common/successResponse');
const ErrorResponse = require('../utils/common/errorResponse');

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: "ASIAQL6BZ5JNHB2UQPPU",
    secretAccessKey: "/Mvxm4p8bGXrs7zIHMAd0X4Fq0oqhL8AmkZH6XZF",
    sessionToken: "IQoJb3JpZ2luX2VjEML//////////wEaCXVzLXdlc3QtMiJHMEUCIQCnf7KdJuf9HRmZWRzs0ugiyjPgl+eP8O8pKGGozGORGgIgKcEjzFJzIGYUQ8rR5Ef2FTUSAVMJUG2e8XjKkLQBA2IqsAIIq///////////ARAAGgwwMjU2MzkzODE1OTQiDAc/5KcJj15vkkyNQSqEAveVnySfOrBRKixLinhZe0RWUEUmFHVSR75XlkrA7G3ARi2yvoeycpjeXhWW0hL82qU90Fqpn34UHtr9PahNvnl9jyZML9wwhdubCZyWHVHaySng/OC8TYoBPRPUaECFfYtaOv95ls2qRsdR9TWJxY1xfWb7Q7o/aksdPqe6KN5CN05LYzJ4SVK+VtLImnYAl6VN2wcyNbR4uAj4ZdK6Dfh7WXQpNfo7ey3jetpvYneSwcF0ocx8b6X8zvX8KFgZdPEi5Z3hvQkCNP8ok9TFlfobUx9n59eGinD5fIGIzjKkF8jkm1TEq2HDzqUyKcnlgUHobeN346pDd8ltWk3N6TlWM9FVMMveubUGOp0BDilshPLwL/WyRgnljdhYDEsNZdcDmPl6trgjHjLAji4V13XmqmgeV0QPajOe9oX3T8nM54+aH93nFQxfbRvhcZ6VUwonAltagqJR7LggiDwzpW7ArVsuGsE3DE/3cK8Xo0X2fJXMrqpMJ15lwK4rZX+HcH2mcDcQEFK9e4PFSo45TbgXbLFQOUbPhnrLyROivdfJxtKFrHefnigWfg==",
    logger: console
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

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
