import { IStorageResult } from "./storageResult"

export interface IStorageService {
   storageProvider: string
   /**
    * @param item The binary to be persisted as an object
    * @param name Object name that the object will be searched by 
    * @param path The path where the object will be persisted
    */
   saveObject(item: ReadableStream<any>, name: string, path: string): Promise<IStorageResult>
   appendToObject(item: ReadableStream<any>, path: string, object: string): Promise<IStorageResult>
}