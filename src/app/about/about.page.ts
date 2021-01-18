import { Component, OnInit } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';
import { Platform } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  deviceDetail: any;

  constructor(private device: Device, private platform: Platform, private inAppBrowser: InAppBrowser) { }

  ngOnInit() {
    this.platform.ready()
      .then(() => {
        this.deviceDetail = this.device;
      });
  }

  visitWebsite() {
    let options: InAppBrowserOptions = {
      hideurlbar: 'yes',
      location: 'no'
    }
    this.inAppBrowser.create('https://tekraze.com','_self',options);
  }

}
