import { LocalizerFactory } from "@vsirotin/localizer";
import { LoggerFactory } from "@vsirotin/log4ts";

export const KEY_USER_LANGUAGE_SET = "user-language-is-set";
export const KEY_USER_IS_INFORMED = "user-is-informed";
export const KEY_DATA_SAVING_CONFIRMED = "data-saving-confirmed";


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
    
    
    private isLanguageSet(): boolean {
        const userlangIsSet = localStorage.getItem(KEY_USER_LANGUAGE_SET);
        this.logger.debug("In isLanguageSet userlangIsSet=" + userlangIsSet);
        return !!userlangIsSet;
    }

    languageIsSet(): void {
        this.logger.debug("In languageIsSet");
        localStorage.setItem(KEY_USER_LANGUAGE_SET, "true");
        this.tryProcessUserFirstInformation();
    }
  
    private isUserInformed(): boolean {
        const userInformed = localStorage.getItem(KEY_USER_IS_INFORMED);
        this.logger.debug("In isLanguageSet isUserInformed=" + userInformed);
        return !!userInformed;
    }

    setInformCompletion(): void {
        this.logger.debug("In setInformCompletion");
        localStorage.setItem(KEY_USER_IS_INFORMED, "true");
        this.tryProcessDataSavingConfirmation();
    }

    private isDataSavingConfirmed(): boolean {
        const isDataSavingConfirmed = localStorage.getItem(KEY_DATA_SAVING_CONFIRMED);
        this.logger.debug("In isDataSavingConfirmed isDataSavingConfirmed=" + isDataSavingConfirmed);
        return !!isDataSavingConfirmed;
    }

    setDataSavingConfirmation(): void {
        this.logger.debug("In setConfirmation");
        localStorage.setItem(KEY_DATA_SAVING_CONFIRMED, "true");
        this.startCompletionReceiver!!.completeStartProcess();
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
 * Notifies, that app's (user's) language is setand initiates next workflow step.
 */
export interface ILanguageSetter {
    languageIsSet(): void;
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
    setDataSavingConfirmation(): void;
}

