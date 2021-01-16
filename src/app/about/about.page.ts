import { Component, OnInit } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';
import { Platform } from '@ionic/angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  deviceDetail: any;

  constructor(private device: Device, private platform: Platform, private googleAnalytics: GoogleAnalytics) { }

  ngOnInit() {
    this.platform.ready()
      .then(() => {
        this.deviceDetail = this.device;
        this.googleAnalytics.trackView('About Page');
      });
  }

}
