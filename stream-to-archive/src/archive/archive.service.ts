import { IStorageService } from "../storage/storage.service";
import { ArchiveResult } from "./archiveResult";
import { IArchivable } from "./atchivable";

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

    async jsonObjectArchive(object: IArchivable): Promise<ArchiveResult> {
        try {
            const archivePath = this.archiveLocale();
            const storageResult = await this.storageService.saveObject(object.binary, object.name, archivePath)
            const result: ArchiveResult = {
                message: `${object.name} was archived as ${object.objectType} into result here!`,
                format: object.objectType,
                locale: storageResult.storageProvider
            }
            return result;
        } catch (error) {
            console.error(error)
            return error;
        }
    }
}