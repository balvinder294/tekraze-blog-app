import { Component, OnInit } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  deviceDetail: any;

  constructor(private device: Device, private platform: Platform) { }

  ngOnInit() {
    this.platform.ready()
      .then(() => {
        this.deviceDetail = this.device;
      });
  }

}
