import { Subject, Observable } from "rxjs";

export interface ITimeSeriesDB   {
  getCountEvents(): number;

}


export class TimeSeriesDB implements ITimeSeriesDB{
  getCountEvents(): number{
    return 0;
  }
}



