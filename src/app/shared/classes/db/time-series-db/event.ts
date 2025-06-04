import { ILogger, LoggerFactory } from "@vsirotin/log4ts";

export interface  IClosedEvent{
  setEventType(eventTypeId: string): unknown;
  setWorkflowType(workflowTypeId: number): void;
}

class ClosedEvent implements IClosedEvent {

    private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.CurrentEvent"); 

    workflowTypeId : number = 0;
    eventTypeId: string = "";
    

    setWorkflowType(workflowTypeId: number): void {
        this.logger.debug('setWorkflowType id: ' + workflowTypeId);
        this.workflowTypeId = workflowTypeId;
    }

    setEventType(eventTypeId: string): void {
        this.logger.debug('setEventType id: ' + eventTypeId);
        this.eventTypeId = eventTypeId;
    }
}