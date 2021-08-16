import { PutObjectCommand, PutObjectCommandInput, S3Client } from "@aws-sdk/client-s3";
import { IStorageService } from "./storage.service";
import { IStorageResult } from "./storageResult";

export class S3StorageService implements IStorageService {
    private s3Client: S3Client
    private bucketName: string
    storageProvider: string

    constructor(s3Client: S3Client) {
        this.s3Client = s3Client
        this.storageProvider = 'AWS::S3'
        this.bucketName = process.env.ARCHIVE_BUCKET_NAME || ''
    } 

    async saveObject(item: ReadableStream<any>, name: string, path: string): Promise<IStorageResult> {
        try {
            console.log(`Trying to save object ${name} into ${this.bucketName}/${path}`)
            const input: PutObjectCommandInput = {
                Bucket: this.bucketName,
                Key: `${path}/${name}`,
                Body: item
            },
            command: PutObjectCommand = new PutObjectCommand(input),
            result: IStorageResult = {
                message: `Object ${name} saved into ${this.bucketName}/${path}!`,
                storageProvider: this.storageProvider 
            }
            await this.s3Client.send(command)
            console.log(result.message)
            return result
        } catch (error) {
            console.error(error)
            return error
        }
    }
    appendToObject(item: ReadableStream<any>, path: string, object: string): Promise<IStorageResult> {
        throw new Error("Method not implemented.");
    }
    
}