import { LoggerFactory } from "@vsirotin/log4ts";

export interface IErrorUI {
   errorCode: string; // Unique code for the error
   errorMessage: string; // Human-readable message for the error 
   recomendation: string; // Suggested action to resolve the error
}

export class ErrorUI implements IErrorUI {
   private logger = LoggerFactory.getLogger("eu.sirotin.pritisan.ErrorUI");
   constructor(
      public errorCode: string,
      public errorMessage: string,
      public recomendation: string
   ) {
      this.logger.debug("created:", this.toString());
   }

   toString(): string {
      return `Error Code: ${this.errorCode}, Message: ${this.errorMessage}, Recommendation: ${this.recomendation}`;
   }
}