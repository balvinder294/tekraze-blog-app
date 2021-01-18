import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';

import { TimeagoModule } from 'ngx-timeago';

import { FirebaseX } from '@ionic-native/firebase-x/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    TimeagoModule,
  ],
  providers: [FirebaseX],
  declarations: [SearchPage]
})
export class SearchPageModule {}
