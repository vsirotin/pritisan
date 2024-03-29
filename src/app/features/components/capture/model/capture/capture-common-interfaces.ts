
export interface IRepositoryMetaData {
    currentEventPosition: number;
    countEvents: number;
}


export interface IRepositoryMetaDataExt extends IRepositoryMetaData{
    pageSize: number;
}
export interface IEvent {
    duration: number;
    start: string;
    type: string;
    details: string;
} //------------Current event behavior model----------------

