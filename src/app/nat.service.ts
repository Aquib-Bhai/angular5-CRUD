import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Nat } from './nat';


@Injectable()
export class NatService {
	

natUrl = "http://localhost:3000/nats";

constructor(private http: Http) { }

getAllNats(): Observable<Nat[]>{
	return this.http.get(this.natUrl)
	.map(this.extractData);
								}

createNat(nat: Nat): Observable<number>{
	let cpHeaders = new Headers({'Content-Type': 'application/json'});
	let options = new RequestOptions({ headers: cpHeaders });
	return this.http.post(this.natUrl, nat, options);
										}

getNatById(natId: string): Observable<Nat>{
	let cpHeaders = new Headers({'Content-Type': 'application/json'});
	let options = new RequestOptions({ headers: cpHeaders });
	console.log(this.natUrl +"/"+ natId)
		.map(this.extractData);
										}

updateNat(nat: Nat): Observable<number>{
	let cpHeaders = new Headers({'Content-Type': 'application/json'});
	let options = new RequestOptions({ headers: cpHeaders });
	return this.http.put(this.natUrl +"/"+ nat.id, nat, options)
		.map(success => success.status);
										}

deleteNatById(natId: string): Observable<number> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
		return this.http.delete(this.natUrl +"/"+ natId)
			   .map(success => success.status);
    }


private extractData(res: Response){
	let body = res.json();
	return body;
									}

}
