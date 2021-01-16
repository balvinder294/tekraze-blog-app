import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ApiService } from '../api.service';

import { CategoryPage } from './category.page';

@Injectable({providedIn: 'root'})
export class CategoryDetailResolver implements Resolve<any> {

  constructor(private http: HttpClient, private api: ApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.api.getCategoryById(id).pipe(
        flatMap((categoryRes: HttpResponse<any>) => {
          if (categoryRes.body) {
            return of(categoryRes.body);
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
    component: CategoryPage
  },{
    path: ':id',
    component: CategoryPage,
    resolve: {
      categoryDetail: CategoryDetailResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryPageRoutingModule {}
