import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  categoryId: number;
  categoryName: any;

  public items: any = [];
  per_page: number = 6;
  showLoadMore: boolean = false;
  isLoading: boolean = false;
  sort: string = '0';
  page: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private api: ApiService,
    private socialSharing: SocialSharing,
    private toast: Toast,
    private router: Router,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ categoryDetail }) => {
      this.categoryId = categoryDetail.id;
      this.categoryName = categoryDetail.name;
      this.getPosts();
    });
  }

  getPosts(infiniteScroll?: any, type?: string) {
    if (!this.isLoading) {
      this.isLoading = true;
      if (infiniteScroll != null && type === 'refresh') { // && 'ionRefresh' in infiniteScroll
        this.page = 1;
      }
      let url: string = 'posts?_embed&per_page=' + this.per_page + '&page=' + this.page;
      url += this.categoryId != 0 ? '&categories=' + this.categoryId : '';
      url += this.sort == '1' ? '&order=asc' : this.sort == '2' ? '&orderby=title&order=asc' : this.sort == '3' ? '&orderby=title&order=desc' : '';
      this.api.get(url)
        .subscribe((res: HttpResponse<any>) => {
          const data = res.body;
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

  openDetail(item: any) {
    this.router.navigate(['detail', item.id], { state: { post: item } });
  }

  share(message, title, image, link) {
    this.socialSharing.share(message, title, image, link).then(() => {
      this.toast.showShortCenter('Successfully shared !');
    }).catch(() => { });
  }

  openCategoryPage(id: string) {
    this.router.navigate(['category', id]);
  }

}
