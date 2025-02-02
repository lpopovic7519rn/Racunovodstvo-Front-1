import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KontnaGrupa } from '../../shared/kontna-grupa.model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BilansResponse } from '../../shared/bruto-bilans.model';

@Injectable({
	providedIn: 'root',
})
export class BrutoBilansService {
  private readonly apiUrl = environment.brutoBilansApi;
  private readonly apiUrlIzvestaji = environment.izvestajiApi;

	constructor(private httpClient: HttpClient) {}

	readAll(
		kontoOd: KontnaGrupa,
		kontoDo: KontnaGrupa,
		datumOd: string,
		datumDo: string
	): Observable<BilansResponse[]> {
		let jwt = String(sessionStorage.getItem('jwt'));
		let url = `${this.apiUrl}/brutoBilans`;

		let queryParams = new HttpParams();
		let date1 = new Date(datumDo);
		let date2 = new Date(datumOd);
		let str1 =
			date1.getDate() +
			'/' +
			(date1.getMonth() + 1) +
			'/' +
			date1.getFullYear();
		let str2 =
			date2.getDate() +
			'/' +
			(date2.getMonth() + 1) +
			'/' +
			date2.getFullYear();

		console.log(str1);
		queryParams = queryParams.append('brojKontaDo', kontoDo.brojKonta);
		queryParams = queryParams.append('brojKontaOd', kontoOd.brojKonta);
		queryParams = queryParams.append('datumDo', str1);
		queryParams = queryParams.append('datumOd', str2);

		return this.httpClient.get<BilansResponse[]>(url, {
			headers: {
				Authorization: 'Bearer '.concat(jwt.toString()),
			},
			params: queryParams,
		});
	}

  getIzvestaj(
    title: string,
    kontoOd: KontnaGrupa,
    kontoDo: KontnaGrupa,
    datumOd: string,
    datumDo: string
  ): Observable<ArrayBuffer> {
    let jwt = String(sessionStorage.getItem('jwt'));
    let url = `${this.apiUrlIzvestaji}/bruto`;

    let queryParams = new HttpParams();
    let date1 = new Date(datumDo);
    let date2 = new Date(datumOd);
    let str1 = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate();
    let str2 = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate();

    console.log(datumOd);
    queryParams = queryParams.append('brojKontaDo', kontoDo.brojKonta);
    queryParams = queryParams.append('brojKontaOd', kontoOd.brojKonta);
    queryParams = queryParams.append('datumDo', str1);
    queryParams = queryParams.append('datumOd', str2);
    queryParams = queryParams.append('title', title);
    queryParams = queryParams.append('name', 'user1');
    console.log("get pdf")
    return this.httpClient.get<ArrayBuffer>(url, {
      headers: {
        Authorization: 'Bearer '.concat(jwt.toString()),
      },
      responseType : 'blob' as 'json',
      params: queryParams,
    });
  }
}
