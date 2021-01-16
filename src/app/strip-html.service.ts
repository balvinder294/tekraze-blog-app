import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'stripHTML'
})
@Injectable({
  providedIn: 'root'
})
export class StripHtmlService {

  constructor() { }

  transform(html: string) {
		return html.replace(/<(?:.|\n)*?>/gm, '');
	}
}
