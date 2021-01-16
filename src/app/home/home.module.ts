import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { TimeagoModule } from 'ngx-timeago';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Toast } from '@ionic-native/toast/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TimeagoModule,
  ],
  providers: [SocialSharing, Toast],
  declarations: [HomePage]
})
export class HomePageModule {}
