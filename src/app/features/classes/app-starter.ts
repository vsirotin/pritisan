import { LoggerFactory } from "@vsirotin/log4ts";

/*
    Manages start process of app. 
    Implements a logic from Ucs Case S-01-General-Actions
    from /docs/user-stories/S-01-General-Actions/U-01-01-App-Start.md
*/
export class AppStarter implements ILanguageSetter, IWelcomeInformer, ISavingDataConfirmation {
    private static instance: AppStarter = new AppStarter();

    private startProcessNotificationReceiver: IStartProcessNotificationReceiver | undefined;
    private startCompletionReceiver: IStartCompletionReceiver | undefined;

    public static setStartProcessNotificationReceiverAndStart(receiver: IStartProcessNotificationReceiver) {
        AppStarter.instance.setStartProcessNotificationReceiver(receiver);
    }

    public static setStartCompletionReceiver(receiver: IStartCompletionReceiver) {
        AppStarter.instance.setCompletionReceiver(receiver);
       
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
        return AppStarter.instance;
    }

    public static getWelcomeInformer(): IWelcomeInformer {
        return AppStarter.instance;
    }
    public static getSavingDataConfirmation(): ISavingDataConfirmation {
        return AppStarter.instance;
    }

    private logger = LoggerFactory.getLogger("AppStarter");

    private constructor() {
        this.logger.debug("AppStarter is created.");
    }
    
    private start() : void {

        this.logger.debug("Start process is started. this.startCompletionReceiver: " + this.startCompletionReceiver);

        if(!this.startCompletionReceiver) {
            this.logger.error("Start process is not completed. StartCompletionReceiver is not set.");
            return;
        }

        //DS-01: IF the user's language is set THEN proceed to U-01-02 ELSE proceed to U-01-02: Set user language.
        if (this.isLanguageSet()) {
            this.logger.debug("In start: User's language is set.");
            this.tryProcessUserFirstInformation();
            return;
        }

        this.logger.debug("In start: User's language is NOT set.");
        this.startProcessNotificationReceiver!!.startLanguageSettingProcess();
       
    }

    /**
     * 
     * @returns Implements //DS-02: IF the user has been informed about the application THEN proceed to DS-03 ELSE proceed to U-01-03: Inform user about app.
     */
    private tryProcessUserFirstInformation() {
        this.logger.debug("In tryProcessUserFirstInformation");
        if (this.isUserInformed()) {
            this.tryProcessDataSavingConfirmation();
            return;
        }

        this.logger.debug("In tryProcessUserFirstInformation: The user has not yet received the initial welcome.");
        this.startProcessNotificationReceiver!!.startWelcomeProcess();
    }
    /**
     * Implements DS-03: IF the user has NOT confirmed data saving THEN proceed to U-01-04: Ask user to confirm data saving.
     */
    private tryProcessDataSavingConfirmation() {
        this.logger.debug("In tryProcessDataSavingConfirmation");
        if(this.isDataSavingConfirmed()) {
            this.startCompletionReceiver!!.completeStartProcess();
            return;
        }

        this.logger.debug("In tryProcessUserFirstInformation: The user has not confirmed data saving.");
        this.startProcessNotificationReceiver!!.startDataSavingConfirmationProcess();
    }
    
    private isDataSavingConfirmed(): boolean {
        this.logger.debug("In isDataSavingConfirmed");
        return true;
    }
    
    private isUserInformed(): boolean {
        this.logger.debug("In isUserInformed");
        return true;
    }
    
    private isLanguageSet(): boolean {
        this.logger.debug("In isLanguageSet");
        return true;
    }

    setLanguage(language: string): void {
        this.logger.debug("In setLanguage");
        throw new Error("Method not implemented.");
    }

    setInformCompletion(): void {
        this.logger.debug("In setInformCompletion");
        throw new Error("Method not implemented.");
    }

    setConfirmation(): void {
        this.logger.debug("In setConfirmation");
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

