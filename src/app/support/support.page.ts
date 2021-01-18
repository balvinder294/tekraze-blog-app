import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AdsService } from '../ads.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

  mobileAppFlag: boolean;

  constructor(private platform: Platform, private adService: AdsService) { }

  ngOnInit() {
    if(this.platform.is('android' || 'cordova' || 'capacitor')) {
      this.mobileAppFlag = true;
    }
  }

  showVideoAd() {
    this.adService.showVideoAd();
  }

  showInterAd() {
    this.adService.showInterstitialAd();
  }

}
