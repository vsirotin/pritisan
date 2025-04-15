import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
import * as uiItems from '../../../../../assets/languages/features/components/start/welcome/lang/1/en-US.json';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { ILocalizer, ILocalizationClient, LocalizerFactory } from '@vsirotin/localizer';
import { AppStarter } from '../../../classes/app-starter';

const MY_DIR = "assets/languages/features/components/start/welcome/lang";
export interface GalleryImage {
  src: string;
  alt: string; // Alt text for accessibility
  label: string;
};
interface UIItems {
  title: string;
  text: string;
  btn_next: string;
}
@Component({
  selector: 'app-welcome',
  imports: [
    ScrollingModule,
    MatIconModule, 
    MatButtonModule
  ],
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnDestroy, ILocalizationClient<UIItems>{

  images: GalleryImage[] = [
    { src: 'assets/images/img1.jpg', alt: 'Description for image 1', label: 'Scenic Mountain View' },
    { src: 'assets/images/img2.jpg', alt: 'Description for image 2', label: 'Abstract Colors' },
    { src: 'assets/images/img3.jpg', alt: 'Description for image 3', label: 'Funny Cat Animation' }
    // Add more images as needed
  ];

  indexes: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  currentIndex: number = 0;
  currentImage: GalleryImage;

  logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.WelcomeComponent");

  private localizer: ILocalizer;

  ui: UIItems = (uiItems as any).default;

    constructor( ) {
      this.logger.debug("Start of constructor");  
  
      this.localizer  =  LocalizerFactory.createLocalizer<UIItems>(MY_DIR, 1, this.ui, this);
      this.currentImage = this.images[this.currentIndex];
    
    }


  ngOnDestroy() {
    this.logger.debug("Start of ngDestroy");
    this.localizer.dispose();
  }

  onNextClick() {
    this.logger.debug("Start of onNextClick");
    AppStarter.getLanguageSetter().languageIsSet();
  }

  updateLocalization(data: UIItems): void {
    this.logger.debug("Start of updateLocalization data=" + JSON.stringify(data));
    this.ui = data;
  }

  ngOnInit(): void {
    // Optional: Add initialization logic if needed
    if (!this.images || this.images.length === 0) {
      console.warn("ImageGalleryComponent: No images provided.");
      // Provide default images or handle the empty case
      // Example default:
      // this.images = [
      //   { src: 'assets/images/default1.jpg', alt: 'Default Image 1', label: 'Default 1' },
      //   { src: 'assets/images/default2.jpg', alt: 'Default Image 2', label: 'Default 2' }
      // ];
    }
  }

  /**
   * Sets the current image index to the selected dot index.
   * @param index The index of the image to navigate to.
   */
  goToSlide(index: number): void {
    this.logger.debug("Start of goToSlide index=" + index);
    if (index >= 0 && index < this.images.length) {
      this.currentIndex = index;
      this.currentImage = this.images[this.currentIndex];
    }
  }

  // Optional: Add methods for next/previous buttons if desired
  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  // Helper to get the current image object safely
  // get currentImage(): GalleryImage | null {
  //   return this.images && this.images.length > 0 ? this.images[this.currentIndex] : null;
  // }

 

}
