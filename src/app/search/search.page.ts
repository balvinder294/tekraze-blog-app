import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  per_page = 5;
  items: any = [];
  page: number = 1;
  showLoadMore = false;
  isLoading = false;
  searchQuery: string = '';

  constructor(private router: Router, private api: ApiService, private googleAnalytics: GoogleAnalytics) { }

  ngOnInit() {
    this.googleAnalytics.trackView('Search Page');
  }


  onSearch() {
    this.googleAnalytics.trackEvent('Post Search', 'Search ' + this.searchQuery);
    this.items = [];
    this.getPosts();
  }

  getPosts() {
    if (!this.isLoading && this.searchQuery.length > 0) {
      this.isLoading = true;
      const searchQuery = 'posts?_embed&per_page=' + this.per_page + '&page=' + this.page + '&search=' + this.searchQuery;
      this.api.get(searchQuery)
        .subscribe((res: any) => {
          console.log(res);
          const data = res.body;
          this.isLoading = false;
          this.items = this.items.concat(data);

          if (data.length === this.per_page) {
            this.page++;
            this.showLoadMore = true;
          }
          else {
            this.showLoadMore = false;
          }
          this.page++;
        }, (error) => {
          this.isLoading = false;
          if (error.error.code === "rest_post_invalid_page_number") {
            this.showLoadMore = false;
          }
        });
    }
  }
  clearSearch() {
    this.searchQuery = '';
    this.items = [];
    this.page = 1;
    this.showLoadMore = false;
  }

  openDetail(item: any) {
    this.googleAnalytics.trackView('Detail Page' + item.title.rendered);
    this.router.navigate(['detail', item.id], { state: { post: item } });
  }

  goHome() {
    this.router.navigate(['']);
  }

}
