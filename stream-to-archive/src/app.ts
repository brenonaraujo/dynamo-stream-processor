import { DynamoDBStreamEvent } from "aws-lambda"
import { S3Client } from "@aws-sdk/client-s3"
import { S3StorageService } from "./storage/s3Storage.service"
import { ArchiveService } from "./archive/archive.service"
import { IArchivable } from "./archive/atchivable"

const region = process.env.CLOUD_REGION || 'us-east-1'
const archiveService = new ArchiveService(new S3StorageService(new S3Client({region: region})))

export const handler = async (event: DynamoDBStreamEvent): Promise<any> => {
    console.log(`Start to process stream event`)
    event.Records.map(async event => {
        const archivable: IArchivable = {
            binary: event.dynamodb?.NewImage
        }
        await archiveService.jsonObjectArchive(event)
    })
    return {statusCode: 200}
}