
import { Data } from "@angular/router";
import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { IClosedEvent } from "../../../../features/models/capture/capturer";


export class TimeSeriesDB {

   private static instance: TimeSeriesDB = new TimeSeriesDB();
  
  static saveClosedEvent(closedEvent: IClosedEvent) {
      TimeSeriesDB.instance.saveClosedEventImpl(closedEvent);
  }



 
  private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.TimeSeriesDB");

  constructor() {
    this.logger.log("TimeSeriesDB created");
  }

  private saveClosedEventImpl(closedEvent: IClosedEvent) {
    this.logger.debug("saveClosedEventImpl: ", closedEvent);  
  }

 
}




