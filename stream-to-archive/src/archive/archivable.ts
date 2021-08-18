import { unmarshall } from "@aws-sdk/util-dynamodb"
import { AttributeValue } from "aws-lambda"

enum OBJECT_TYPE {
    JSON = '.json',
    PARQUET = '.parquet'
}

export interface IArchivable {
    name: string
    objectType: OBJECT_TYPE,
    binary: ReadableStream<any>
}

export function fromDynamoStreamToJson(eventObject: {[key: string]: AttributeValue } | undefined): IArchivable {
    try {
        console.log(`Trying to convert the stream record to a json object`)
        const fromRecord = JSON.stringify(eventObject)
        const asJson = unmarshall(JSON.parse(fromRecord))
        const result: IArchivable = {
            binary: new ReadableStream(asJson),
            objectType: OBJECT_TYPE.JSON,
            name: 'default_archivable_name'
        }
        console.log('EventObject parsed and converted to an Archivable object')
        return result
    } catch (error) {
        console.error(error)
        return error
    }
}