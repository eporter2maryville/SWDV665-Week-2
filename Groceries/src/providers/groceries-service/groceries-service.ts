import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';


/*
  Generated class for the GroceriesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroceriesServiceProvider {

  items: any = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL =  "https://groveries-server-demo.herokuapp.com";
  
  constructor(public http:HttpClient) {
    console.log('Hello GroceriesServiceProvider Provider');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getItems(): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/groceries').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res:Response) {
    let body = res;
    return body || {};
  }
private handleError(error: Response | any) {
  let errmsg: string;
  if (error instanceof Response) {
    const err = error || '';
    errmsg = `${error.status} - ${error.statusText || ""} ${err}`;
  } else{
    errmsg = error.message ? error.message : error.toString();
  }
  console.error(errmsg);
  return Observable.throw(errmsg);
}
  removeItem(id) {
    console.log("#### Remove Item -id", id)
    this.http.delete(this.baseURL + 'api/groceries/' + id).subscribe(res => {
    this.items = res;
    this.dataChangeSubject.next(true);
  });
  }

  addItem(item) {
    this.http.post(this.baseURL + 'api/groceries/', item).subscribe(res => {
    this.items = res;
    this.dataChangeSubject.next(true);
    });
  }

  editItem(item, index) {
    console.log("#### Editing Item = ", item)
    this.http.put(this.baseURL + 'api/groceries/'+ item._id, item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

}
