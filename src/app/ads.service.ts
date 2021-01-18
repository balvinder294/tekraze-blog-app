import { Injectable } from '@angular/core';

import { AdMob } from '@admob-plus/ionic'
import { IAdRequest } from '@admob-plus/core';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  overlay_add_id = 'ca-app-pub-8511986564530448/8954552757';
  banner_add_id = 'ca-app-pub-8511986564530448/6139868915';
  inter_add_id = 'ca-app-pub-8511986564530448/2883968427';
  reward_add_id = 'ca-app-pub-8511986564530448/9392895822';

  constructor(private admob: AdMob) { }

  showBannerAd() {
    this.admob.banner.show({
      id: {
        android: this.banner_add_id,
        ios: 'test'
      }, position: 'bottom'
    })
    .then(shown =>  {
      console.log('Ad Shown', shown)
    })
    .catch(err => {
      console.log('Add not shown',err);
    });
  }

  closeBannerAd() {
    this.admob.banner.hide(
      {
        android: this.banner_add_id,
        ios: 'test'
      }
    );
  }

  showInterstitialAd() {
    this.admob.interstitial.load({
      id: {
        android: this.inter_add_id,
        ios: ''
      }
    })
      .then(() => {
        this.admob.interstitial.show()
          .then(shown =>  {
            console.log('Ad Shown', shown)
          })
          .catch(err => {
            console.log('Add not shown',err);
          });
      })
  }

  showVideoAd() {
    this.admob.rewardVideo.load({
      id: {
        android: this.reward_add_id,
        ios: 'test'
      }
    })
      .then(() => {
        this.admob.rewardVideo.show()
        .then(shown =>  {
          console.log('Ad Shown', shown)
        })
        .catch(err => {
          console.log('Add not shown',err);
        });
      })
  }
}
