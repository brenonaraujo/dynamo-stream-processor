import { IStorageService } from "../storage/storage.service";
import { ArchiveResult } from "./archiveResult";
import { IArchivable } from "./archivable";

export class ArchiveService {
    private storageService: IStorageService
    constructor(storageService: IStorageService) {
        this.storageService = storageService;
    }
    
    private pathPartitionFromDate(date: Date): string {
        const formatNumber = (num: number) => num < 10 ? `0${num}` : num,
        year = date.getFullYear(),
        month = formatNumber(date.getUTCMonth()),
        day = formatNumber(date.getUTCDay())
        return `${year}/${month}/${day}`
    }

    private archiveLocale(): string {
        const prefix = process.env.ARCHIVE_PATH_PREFIX || `ARCHIVE`
        return `${prefix}/${this.pathPartitionFromDate(new Date)}/`
    }

    /**
     * Archive an archivable object into pre defined storage settings
     * @param object Archivable object with ReadableStream
     * @returns 
     */
    async jsonObjectArchive(object: IArchivable): Promise<ArchiveResult> {
        try {
            console.log(`Trying to archive object: ${object.name} as ${object.objectType}`)
            const archivePath = this.archiveLocale();
            const storageResult = await this.storageService.saveObject(object.binary, object.name, archivePath)
            const result: ArchiveResult = {
                message: `${object.name} was archived as ${object.objectType} into result here!`,
                format: object.objectType,
                locale: storageResult.storageProvider
            }
            console.log(result.message)
            return result;
        } catch (error) {
            console.error(error)
            return error;
        }
    }

    
}