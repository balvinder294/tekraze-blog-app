import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPageRoutingModule } from './detail-routing.module';

import { DetailPage } from './detail.page';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPageRoutingModule,
    TimeagoModule,
  ],
  providers: [SocialSharing, Toast],
  declarations: [DetailPage]
})
export class DetailPageModule {}
