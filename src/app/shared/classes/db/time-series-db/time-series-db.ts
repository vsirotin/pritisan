
import { Data } from "@angular/router";
import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { EventsSaver } from "./events-saver";
import { IClosedEvent, IRunningEvent, ITimePointEvent } from "../../../../features/capture/commons/event-commons";



export class TimeSeriesDB {

  private static instance: TimeSeriesDB = new TimeSeriesDB();
  
  static saveClosedEvent(closedEvent: IClosedEvent) {
      TimeSeriesDB.eventsSaver.saveClosedEvent(closedEvent);
  }

  static saveTimePointEvent(timePointEvent: ITimePointEvent) {
      TimeSeriesDB.eventsSaver.saveTimePointEvent(timePointEvent);
  }
  
  static saveRunningEvent(runningEvent: IRunningEvent) {
     TimeSeriesDB.eventsSaver.saveRunningEvent(runningEvent);
  }

  private static eventsSaver = new EventsSaver();



 
}




