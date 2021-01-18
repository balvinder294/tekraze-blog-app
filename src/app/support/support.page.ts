import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AdsService } from '../ads.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

  mobileAppFlag: boolean;

  constructor(private platform: Platform, private adService: AdsService, private inAppBrowser: InAppBrowser) { }

  ngOnInit() {
    if(this.platform.is('android' || 'cordova' || 'capacitor')) {
      this.mobileAppFlag = true;
    }
  }

  visitWebsite() {
    let options: InAppBrowserOptions = {
      hideurlbar: 'yes',
      location: 'no'
    }
    this.inAppBrowser.create('https://tekraze.com','_self',options);
  }

  showVideoAd() {
    this.adService.showVideoAd();
  }

  showInterAd() {
    this.adService.showInterstitialAd();
  }

}
