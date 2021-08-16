import { DynamoDBStreamEvent } from "aws-lambda"

export const handler = async (event: DynamoDBStreamEvent): Promise<any> => {
    console.log(`Start to process stream event`)
    return {statusCode: 200}
}