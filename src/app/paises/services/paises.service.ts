import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Country } from 'src/app/paises/interfaces/paises.interfaces';


@Injectable({
    providedIn: 'root'
})
export class PaisesService {

    private apiUrl: string = "https://restcountries.com/v3.1";
    private fields: string = "name,cca3,latlng,borders,flags";

    private regiones: string[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

    constructor(
        private http: HttpClient
    ) {
        // Do nothing
    }

    public getRegiones(): string[] {
        return [...this.regiones];
    }

    getPaisesPorRegion(region: string): Observable<Country[]> {
        const params = new HttpParams()
            .set("fields", this.fields);

        return this.http.get<Country[]>(`${this.apiUrl}/region/${region}`, { params });
    }

    getPaisesPorCodigo(codigos: string[]) {
        const params = new HttpParams()
            .set("codes", codigos.toString())
            .set("fields", this.fields);

        return this.http.get<Country[]>(`${this.apiUrl}/alpha`, { params });
    }

}
