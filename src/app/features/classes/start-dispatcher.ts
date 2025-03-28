import { LoggerFactory } from "@vsirotin/log4ts";

/*
    Manages start process of app. 
    Implements a logic from Ucs Case S-01-General-Actions/U-01-01-App-Start.md 
    from /docs/user-stories/S-01-General-Actions/U-01-01-App-Start.md
*/
export class StartDispatcher implements ILanguageSetter, IWelcomeInformer, ISavingDataConfirmation {
    private static instance: StartDispatcher = new StartDispatcher();

    private startProcessNotificationReceiver: IStartProcessNotificationReceiver | undefined;
    private startCompletionReceiver: IStartCompletionReceiver | undefined;

    public static setStartProcessNotificationReceiver(receiver: IStartProcessNotificationReceiver) {
        StartDispatcher.instance.setStartProcessNotificationReceiver(receiver);
    }

    public static setStartCompletionReceiver(receiver: IStartCompletionReceiver) {
        StartDispatcher.instance.setCompletionReceiver(receiver);
       
    }
    setCompletionReceiver(receiver: IStartCompletionReceiver) {
        this.startCompletionReceiver = receiver;
        this.logger.debug("StartCompletionReceiver is set.");
    }

    setStartProcessNotificationReceiver(receiver: IStartProcessNotificationReceiver) {
        this.startProcessNotificationReceiver = receiver;
        this.logger.debug("StartProcessNotificationReceiver is set.");
        this.start();
    }

    public static getLanguageSetter(): ILanguageSetter {
        return StartDispatcher.instance;
    }

    public static getWelcomeInformer(): IWelcomeInformer {
        return StartDispatcher.instance;
    }
    public static getSavingDataConfirmation(): ISavingDataConfirmation {
        return StartDispatcher.instance;
    }

    private logger = LoggerFactory.getLogger("StartDispatcher");

    private constructor() {
        this.logger.debug("StartDispatcher is created.");
    }
    
    private start() : void {

        this.logger.debug("Start process is started. this.startCompletionReceiver: " + this.startCompletionReceiver);

        if(!this.startCompletionReceiver) {
            this.logger.error("Start process is not completed. StartCompletionReceiver is not set.");
            return;
        }

        //DS-01: IF the user's language is set THEN proceed to U-01-02 ELSE proceed to U-01-02: Set user language.
        if (!this.isLanguageSet()) {
            this.startProcessNotificationReceiver!!.startLanguageSettingProcess();
            return;
        }

        if(this.startCompletionReceiver) {
            this.startProcessNotificationReceiver!!.startWelcomeProcess();
            return;
        }

        
       
    }
    
    private isLanguageSet(): boolean {
        return true;
    }

    setLanguage(language: string): void {
        throw new Error("Method not implemented.");
    }

    setInformCompletion(): void {
        throw new Error("Method not implemented.");
    }

    setConfirmation(): void {
        throw new Error("Method not implemented.");
    }



}

/**
 * Receives information about completing of the start process.
 */
export interface IStartCompletionReceiver {

    completeStartProcess(): void;
}

/**
 * Receives information about openning of start dialogs by start process.
 */
export interface IStartProcessNotificationReceiver {
    startLanguageSettingProcess(): void;
    startWelcomeProcess(): void;
    startDataSavingConfirmationProcess(): void;
}

/**
 * Check and set app's (user's) language and initiates next workflow step.
 */
export interface ILanguageSetter {
    setLanguage(language: string): void;
}

/**
 * Checks and sets app's (user's) information about app's features and initiate next workflow step.
 */
export interface IWelcomeInformer {
    setInformCompletion(): void;
}

/**
 * Checks and sets information, that user confirmed a data saving.
 */
export interface ISavingDataConfirmation {
    setConfirmation(): void;
}

