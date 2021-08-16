enum OBJECT_TYPE {
    JSON = '.json',
    PARQUET = '.parquet'
}

export interface IArchivable {
    name: string
    objectType: OBJECT_TYPE,
    binary: ReadableStream<any>
}