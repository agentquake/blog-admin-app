import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';



const apiUrl = 'http://blogwebsite.us-east-2.elasticbeanstalk.com';

@Injectable({ providedIn: 'root' })

export class PostService {
    constructor(
        private http: HttpClient) {
    }

    // getAccessToken(): Observable<Post[]> {
    //     return this.http.get<Blogger[]>(apiUrl + '/post')
    //         .pipe(tap(_ => console.log('fetched posts')),
    //             catchError(err => {
    //                 console.log(err);
    //                 return of(null);
    //             }));
    // }
}
