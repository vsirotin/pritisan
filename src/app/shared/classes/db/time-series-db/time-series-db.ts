
import { Data } from "@angular/router";
import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { IClosedEvent, IRunningEvent, ITimePointEvent } from "../../../../features/models/capture/business-logic-model/current-event-business-logic-model/event-commons";
import { EventsSaver } from "./events-saver";



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




