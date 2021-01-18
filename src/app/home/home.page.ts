import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public items: any = [];
  per_page: number = 6;
  page: number = 1;
  showLoadMore: boolean = false;
  isLoading: boolean = false;
  category_id: any = 0;
  sort: string = '0';

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private socialSharing: SocialSharing,
    private toast: Toast,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      console.log(this.router.getCurrentNavigation().extras);
      if (this.router.getCurrentNavigation().extras.state) {
        this.category_id = this.router.getCurrentNavigation().extras.state.categoryId;
      }
    });
    if (this.activatedRoute.snapshot.paramMap.get('category_id') != null && this.activatedRoute.snapshot.paramMap.get('category_id') != undefined) {
      this.category_id = this.activatedRoute.snapshot.paramMap.get('category_id');
    }
    this.getPosts();
  }

  getPosts(infiniteScroll?: any, type?: string) {
    if (!this.isLoading) {
      this.isLoading = true;
      if (infiniteScroll != null && type === 'refresh') { // && 'ionRefresh' in infiniteScroll
        this.page = 1;
      }
      let url: string = 'posts?_embed&per_page=' + this.per_page + '&page=' + this.page;
      url += this.category_id != 0 ? '&categories=' + this.category_id : '';
      url += this.sort == '1' ? '&order=asc' : this.sort == '2' ? '&orderby=title&order=asc' : this.sort == '3' ? '&orderby=title&order=desc' : '';
      this.api.get(url)
        .subscribe((res: HttpResponse<any>) => {
          const data = res.body;
          console.log(data[0]);
          this.isLoading = false;
          this.items = infiniteScroll != null && type === 'refresh' ? data : this.items.concat(data); // && 'ionRefresh' in infiniteScroll

          if (data.length === this.per_page) {
            this.page++;
            this.showLoadMore = true;
          }
          if (infiniteScroll && type === 'infinite' && 'target' in infiniteScroll) {
            infiniteScroll.target.complete();
          }
        }, (error) => {
          console.log('errrrrror');
          this.isLoading = false;
          if (infiniteScroll && type === 'infinite' && 'target' in infiniteScroll) {
            infiniteScroll.target.complete();
          }
        });
    }
  }

  getCategories() {
    this.api.getCategories();
  }

  changeSort() {
    this.items = [];
    this.page = 1;
    this.showLoadMore = false;
    this.getPosts();
  }

  share(message, title, image, link) {
    this.socialSharing.share(message, title, image, link).then(() => {
      this.toast.showShortCenter('Successfully shared !');
    }).catch(() => { });
  }

  openDetail(item: any) {
    this.router.navigate(['detail', item.id], { state: { post: item } });
  }

  openSearchPage() {
    this.router.navigate(['search']);
  }

  openCategoryPage(id: string) {
    this.router.navigate(['category', id]);
  }
}
