import { Injectable }     from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

interface NewItem {
  'item': string;
}

@Injectable()

export class ToDoService {
  private url: string = 'https://api.appery.io/rest/1/db/collections/todo/';
  private dbID: string = '58567a98e4b02b2c07d9ac24';
  private headers = new Headers({ 'Content-Type': 'application/json', 'X-Appery-Database-Id': this.dbID });
  private newItem: NewItem = {'item': 'item'};

  constructor (private http: Http) {}

  getList = (): Promise<Array<string>> => {

    return this.http.get(this.url, {headers: this.headers})
                  .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
  }

  addItem = (item: string): Promise<Array<string>> => {
    this.newItem.item = item;
    return this.http.post(this.url, this.newItem, {headers: this.headers})
             .toPromise()
             .then(this.extractData)
             .catch(this.handleError);
  }

  private extractData(res: Response) {
    let data: Array<any> = res.json();
    let list: Array<string> = [];

    for (let todo of data) {
      list.push(todo.item);
    }

    return list || {};
  }

  private handleError (error: Response | any) {
  // In a real world app, we might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Promise.reject(errMsg);
  }
}
