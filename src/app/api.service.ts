import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL: string = 'https://tekraze.com/wp-json/wp/v2/';
  public Categories: any[];

  
  constructor( private http: HttpClient) { }

  // getPostById(id: number): Observable<any> {
  //   return this.postsService.get(id);
  // }

  get(query: any){
    const param = this.API_URL + query;
    return this.http.get<any>(param, {observe: 'response'});
  }

  getCategories(){
    this.get('categories').subscribe( (res: HttpResponse<any>) =>{
      this.Categories = res.body;
      console.log('Categories', res.body);
    });
    return this.Categories;
    // return this.Categories;
  }

  getCategoryAsPromise() {
    return this.get('categories')
      .pipe(
        map(res => res.body)
      ).toPromise();
  }

  getCategoryName(category_id:number){
    let category_name:string =  "";

    this.Categories.forEach(element => {
      if (element.id == category_id){
        category_name = element.name;
      }
    });
    return category_name;
  }

  getCategoryById(id: any) {
    return this.http.get<any>(this.API_URL + 'categories/' + id, { observe: 'response' });
  }
}