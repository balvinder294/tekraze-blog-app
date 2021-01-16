import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll, IonRefresher } from '@ionic/angular';
import { ApiService } from '../api.service';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public items: any = [];
  private per_page: number = 6;
  private page: number = 1;
  private showLoadMore: boolean = false;
  private isLoading: boolean = false;
  private category_id: any = 0;
  private sort: string = '0';

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private socialSharing: SocialSharing, private toast: Toast) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.activatedRoute.snapshot.paramMap.get('category_id') != null && this.activatedRoute.snapshot.paramMap.get('category_id') != undefined) {
      this.category_id = this.activatedRoute.snapshot.paramMap.get('category_id');
    }
    // this.getPosts();
    // this.getCategories();
  }

  // getPosts(infiniteScroll?: any, type?: string) {
  //   if (!this.isLoading) {
  //     this.isLoading = true;
  //     if (infiniteScroll != null && type === 'refresh') { // && 'ionRefresh' in infiniteScroll
  //       this.page = 1;
  //     }
  //     let url: string = 'posts?_embed&per_page=' + this.per_page + '&page=' + this.page;
  //     url += this.category_id != 0 ? '&categories=' + this.category_id : '';
  //     url += this.sort == '1' ? '&order=asc' : this.sort == '2' ? '&orderby=title&order=asc' : this.sort == '3' ? '&orderby=title&order=desc' : '';
  //     this.api.get(url)
  //       .subscribe((res: HttpResponse<any>) => {
  //         const data = res.body;
  //         console.log(data[0]);
  //         this.isLoading = false;
  //         this.items = infiniteScroll != null && type === 'refresh' ? data : this.items.concat(data); // && 'ionRefresh' in infiniteScroll

  //         if (data.length === this.per_page) {
  //           this.page++;
  //           this.showLoadMore = true;
  //         }
  //         if (infiniteScroll && type === 'infinite' && 'target' in infiniteScroll) {
  //           infiniteScroll.target.complete();
  //         }
  //       }, (error) => {
  //         console.log('errrrrror');
  //         this.isLoading = false;
  //         if (infiniteScroll && type === 'infinite' && 'target' in infiniteScroll) {
  //           infiniteScroll.target.complete();
  //         }
  //       });
  //   }
  // }

  // getCategories() {
  //   this.api.getCategories();
  // }

  // changeSort() {
  //   this.items = [];
  //   this.page = 1;
  //   this.showLoadMore = false;
  //   this.getPosts();
  // }

  // share(message, title, image, link) {
  //   this.socialSharing.share(message, title, image, link).then(() => {
  //     this.toast.showShortCenter('Successfully shared !');
  //   }).catch(() => {});
  // }
}
