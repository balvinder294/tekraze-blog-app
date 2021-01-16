import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ApiService } from '../api.service';

import { DetailPage } from './detail.page';


@Injectable({providedIn: 'root'})
export class PostDetailResolver implements Resolve<any> {

  constructor(private http: HttpClient, private api: ApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      const query = 'posts/' + id + '?_embed';
      return this.api.get(query).pipe(
        flatMap((postRes: HttpResponse<any>) => {
          if (postRes.body) {
            return of(postRes.body);
          } else {
            this.router.navigate(['']);
            return EMPTY;
          }
        })
      );
    }
    return of({});
  }

}

const routes: Routes = [
  {
    path: '',
    component: DetailPage
  },
  {
    path: ':id',
    component: DetailPage,
    resolve: {
      postItem: PostDetailResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPageRoutingModule {}
