import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GenerateWordsDTO} from '../domain/generateWordsDTO';
import { Observable } from 'rxjs';


@Injectable()
export class GeneratorService {

    uri: string= 'https://matrica.hr:4600/Generator';

    constructor(private http: HttpClient) {}



    post(obj: GenerateWordsDTO) : Observable<string[][]> {
        return this.http.post<string[][]>(`${this.uri}`, obj);
        
    }
}
