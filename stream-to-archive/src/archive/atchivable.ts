import { DynamoDBRecord, DynamoDBStreamEvent, DynamoDBStreamHandler, StreamRecord } from "aws-lambda"

enum OBJECT_TYPE {
    JSON = '.json',
    PARQUET = '.parquet'
}

export interface IArchivable {
    name: string
    objectType: OBJECT_TYPE,
    binary: ReadableStream<any>
}

export function fromStreamObject(eventObject: StreamRecord): IArchivable {
    const result: IArchivable = {
    }
    return result
}