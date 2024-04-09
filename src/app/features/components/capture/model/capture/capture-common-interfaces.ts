import { Data } from "@angular/router";

export interface IRepositoryMetaData {
    currentEventPosition: number;
    countEvents: number;
}


export interface IRepositoryMetaDataExt extends IRepositoryMetaData{
    pageSize: number;
}

export interface IEvent {
    id: number
    start: Data;
    fin: Data|null;
    typeId: string;
    details: string|null;
} //------------Current event behavior model----------------

