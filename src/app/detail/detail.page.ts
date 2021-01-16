import { Component, OnInit } from '@angular/core';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { Comment } from '../../app/models/comment';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  instaShareMessageHtml: string;
  instaShareMessage: string;
  morePagesAvailable: boolean;
  public post: any = [];
  public relateditems: any = [];
  comments: any;
  datas: any[];
  shareMessage: string;
  shareLink: string;
  shareImage: string;
  // vukkelCommentsUrl: string;
  // vukkelEmoteUrl: string;
  // vukkelApiKey: string;
  // vukkelVariable: any;
  public isLoading: boolean = false;

  constructor(
    private socialSharing: SocialSharing,
    private toast: Toast,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private googleAnalytics: GoogleAnalytics
  ) {
    // this.vukkelApiKey = 'fefbadaf-276f-4f72-8e73-e1a2acb6e966';
    // this.vukkelCommentsUrl = `https://cdn.vuukle.com/amp.html?apiKey=${this.vukkelApiKey}&host=tekraze.com&id=${this.post.id}&img=${this.shareImage}&title=${this.post.title.rendered}&url=${this.post.link}`;
    // this.vukkelEmoteUrl = `https://cdn.vuukle.com/widgets/emotes.html?apiKey=${this.vukkelApiKey}&host=tekraze.com&articleId=${this.post.id}&img=${this.shareImage}&title=${this.post.title.rendered}&url=${this.post.link}`;
    this.convertHtmlToString();
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ postItem }) => {
      this.post = postItem;
      this.shareImage = this.post._embedded['wp:featuredmedia'][0].source_url;
      this.shareLink = this.post.link;
      this.shareMessage = this.post.excerpt.rendered;
      this.instaShareMessageHtml = this.post.excerpt.rendered = " Check here :" + this.post.link;
      this.instaShareMessage = this.instaShareMessageHtml;
      this.getComments(this.post.id);
      this.getrelated();
    })
  }

  convertHtmlToString() {
    let parser = new DOMParser();
    parser.parseFromString(this.shareMessage, 'text/html');
  }

  ionViewDidLoad() {
    this.morePagesAvailable = true;
    // this.adsService.showBanner();
    // this.getrelated();
  }

  getrelated() {
    if (!this.isLoading) {
      this.isLoading = true;
      this.api.get('posts?_embed&categories=' + this.post.categories[0]).subscribe((data) => {
        this.isLoading = false;
        this.relateditems = data.body;
      }, (error) => {
        this.isLoading = false;
      });
    }
  }

  openDetail(item: any) {
    this.googleAnalytics.trackView('Detail page ' + item.title.rendered);
    this.router.navigate(['detail', item.id]);
    // this.adsService.incrementCounter();
    // this.navCtrl.push(DetailPage, {post: item});
  }

  whatsappShare() {
    this.socialSharing.shareViaWhatsApp(this.shareMessage, this.shareImage, this.shareLink).then(() => {
      this.toast.show('Whatsapp Share Success', '2000', 'center');
    }).catch(() => {
    });
  }
  facebookShare() {
    this.socialSharing.shareViaFacebook(this.shareMessage, this.shareImage, this.shareLink).then(() => {
      this.toast.show('Facebook Share Success', '2000', 'center');
    }).catch(() => {
    });
  }
  instaShare() {
    this.socialSharing.shareViaInstagram(this.instaShareMessage, this.shareImage).then(() => {
      this.toast.show('Instagram Share Success', '2000', 'center');
    }).catch(() => {
    });
  }
  twitterShare() {
    this.socialSharing.shareViaTwitter(this.shareMessage, this.shareImage, this.shareLink).then(() => {
      this.toast.show('Twitter Share Success', '2000', 'center');
    }).catch(() => {
    });
  }

  share(message, title, image, link) {
    this.socialSharing.share(message, title, image, link).then(() => {
      this.toast.show('Share Success', '2000', 'center');
    }).catch(() => {
    });
  }

  getComments(postId: number, page: number = 1) {
    return this.api.get("comments?post=" + postId + '&orderby=date&order=asc')
      .subscribe((cmmtRes: HttpResponse<Comment[]>) => {
        console.log(cmmtRes);
        let commentsArray = [];
        const comments = cmmtRes.body;
        Object.keys(comments).forEach(function (key) {
          commentsArray.push(new Comment(comments[key]));
        });
        this.comments = commentsArray
      }, err => console.error(err));
  }

  openCategoryPage(id: string) {
    this.router.navigate(['category',id]);
  }

}
