import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { AdsService } from './ads.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;

  pageCategories: any;
  public appPages = [
    {
      title: 'Home',
      url: '',
      icon: 'home'
    },
    {
      title: 'About',
      url: 'about',
      icon: 'information'
    },
    {
      title: 'Support us',
      url: 'support',
      icon: 'people'
    }
    // {
    //   title: 'Outbox',
    //   url: '/folder/Outbox',
    //   icon: 'paper-plane'
    // },
    // {
    //   title: 'Favorites',
    //   url: '/folder/Favorites',
    //   icon: 'heart'
    // },
    // {
    //   title: 'Archived',
    //   url: '/folder/Archived',
    //   icon: 'archive'
    // },
    // {
    //   title: 'Trash',
    //   url: '/folder/Trash',
    //   icon: 'trash'
    // },
    // {
    //   title: 'Spam',
    //   url: '/folder/Spam',
    //   icon: 'warning'
    // }
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private api: ApiService,
    private router: Router,
    private firebase: FirebaseX,
    private alertController: AlertController,
    private _location: Location,
    private adsService: AdsService,
    private inAppBrowser: InAppBrowser
  ) {
    this.initializeApp();
    this.api.getCategoryAsPromise()
      .then(res => this.pageCategories = res);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.firebase.setAnalyticsCollectionEnabled(true)
        .then(() => {
          this.firebase.setScreenName('App Menu');
        });
      this.adsService.showBannerAd();
      this.adsService.showInterstitialAd();
      this.inAppBrowserFunc();
    });
    this.exitAppFunc();
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  openSelectedCategory(id: any) {
    this.router.navigate(['category', id]);
  }

  inAppBrowserFunc() {
    document.addEventListener('click', (e: any) => {
      e.preventDefault();
      const webLink = e.target.closest("a");
      
      if (webLink) {
        if(webLink.href) {
          let options: InAppBrowserOptions = {
            hideurlbar: 'yes',
            location: 'no'
          }
          this.inAppBrowser.create(webLink.href,'_self',options);
        }
      } 
      return false;
    });
  }

  exitAppFunc() {
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log('Back press handler!');
      if (this._location.isCurrentPathEqualTo('/') || this._location) {

        // Show Exit Alert!
        console.log('Show Exit Alert!');
        this.showExitConfirm();
        processNextHandler();
      } else {

        // Navigate to back page
        console.log('Navigate to back page');
        this._location.back();

      }

    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      console.log('Handler called to force close!');
      this.alertController.getTop().then(r => {
        if (r) {
          navigator['app'].exitApp();
        }
      }).catch(e => {
        console.log(e);
      })
    });
  }

  showExitConfirm() {
    this.alertController.create({
      header: 'App termination',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      buttons: [{
        text: 'Stay',
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }
}