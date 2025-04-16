import { Component } from '@angular/core';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { ILocalizationClient, ILocalizer, LocalizerFactory } from '@vsirotin/localizer';
import * as imageDescriptions from '../../../../../../assets/images/welcome/image-descriptions/1/en-US.json';

const MY_DIR1 = "assets/images/welcome/image-descriptions";

@Component({
  selector: 'app-welcome-galery',
  imports: [],
  standalone: true,
  templateUrl: './welcome-galery.component.html',
  styleUrl: './welcome-galery.component.scss'
})
export class WelcomeComponentGalery implements ILocalizationClient<string[]>{


  imagesDirPath = "assets/images/welcome/1/";
  indexes: number[] = [1, 2, 3, 4, 5];
  private prefix = this.imagesDirPath + "img";
  private suffix = ".jpg";
  currentImageSrc: string = this.prefix + 1 + this.suffix;
  currentIndex: number = 1;


  logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.WelcomeComponentGalery");

  private localizer: ILocalizer;

  imgDescriptions: string[] = (imageDescriptions as any).default;
  currentLabel = this.imgDescriptions[this.currentIndex - 1];

    constructor( ) {
      this.logger.debug("Start of constructor");  
      this.localizer  =  LocalizerFactory.createLocalizer<string[]>(MY_DIR1, 1, this.imgDescriptions, this);
    }


  updateLocalization(data: string[]): void {
    this.logger.debug("In updateLocalization data=" + JSON.stringify(data));
    this.imgDescriptions = data;
   this.currentLabel = this.imgDescriptions[this.currentIndex - 1];
  }


  /**
   * Sets the current image index to the selected dot index and updates ui data.
   * @param index The index of the image to navigate to.
   */
  goToSlide(index: number): void {

    this.currentIndex = index;
    this.currentImageSrc = this.prefix + index + this.suffix;
    this.currentLabel = this.imgDescriptions[this.currentIndex - 1];
    this.logger.debug("In goToSlide index=", index, "this.currentImageSrc=", this.currentImageSrc, "this.currentLabel=", this.currentLabel);
  }

  ngOnDestroy() {
    this.logger.debug("Start of ngDestroy");
    this.localizer.dispose(); 
  }
 

}
