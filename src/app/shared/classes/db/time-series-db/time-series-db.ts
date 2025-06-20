
import { Data } from "@angular/router";
import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { IClosedEvent } from "../../../../features/models/capture/business-logic-model/current-event-business-logic-model/event-commons";
import { SaverClosedEvent } from "./saver-closed-events";



export class TimeSeriesDB {

  private static instance: TimeSeriesDB = new TimeSeriesDB();
  
  static saveClosedEvent(closedEvent: IClosedEvent) {
      TimeSeriesDB.instance.saveClosedEventImpl(closedEvent);
  }



 
  private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.TimeSeriesDB");

  private saverClosedEvents = new SaverClosedEvent();

  constructor() {
    this.logger.log("TimeSeriesDB created");
  }

  private saveClosedEventImpl(closedEvent: IClosedEvent) {
    this.logger.debug("saveClosedEventImpl: ", closedEvent);  
    this.saverClosedEvents.saveClosedEventImpi(closedEvent)
  }

 
}




