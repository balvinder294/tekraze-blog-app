import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPageRoutingModule } from './category-routing.module';

import { CategoryPage } from './category.page';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPageRoutingModule,
    TimeagoModule,
  ],
  providers: [SocialSharing, Toast],
  declarations: [CategoryPage]
})
export class CategoryPageModule {}
