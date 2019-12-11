import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Blogger } from '../@core/data/blogger';
import { Post } from '../@core/data/posts';



const apiUrl = 'http://blogwebsite.us-east-2.elasticbeanstalk.com';

@Injectable({ providedIn: 'root' })

export class PostService {
    constructor(
        private http: HttpClient) {
    }

    getAll(): Observable<Post[]> {
        return this.http.get<Blogger[]>(apiUrl + '/post')
            .pipe(tap(_ => console.log('fetched posts')),
                catchError(err => {
                    console.log(err);
                    return of(null);
                }));
    }

    approvePost(id: number): Observable<any> {
        return this.http.get(apiUrl + '/post/admin/status/' + id + '?status=APPROVED')
            .pipe(tap(_ => console.log('APPROVED post')),
                catchError(err => {
                    console.log(err);
                    return of(null);
                }));
    }

    rejectPost(id: number): Observable<any> {
        return this.http.get(apiUrl + '/post/admin/status/' + id + '?status=REJECTED')
            .pipe(tap(_ => console.log('REJECTED post')),
                catchError(err => {
                    console.log(err);
                    return of(null);
                }));
    }
    getProduct(): Observable<any> {
        return this.http.get('http://107.150.52.213/api-votf/api/product')
            .pipe(tap(_ => console.log('REJECTED post')),
                catchError(err => {
                    console.log(err);
                    return of(null);
                }));
    }

    // unbanBlogger(bloggerEmail: string): Observable<any> {
    //     return this.http.get(apiUrl + '/external/ban?email=' + bloggerEmail.replace('@', '%40') + '&status=true')
    //         .pipe(tap(_ => console.log('unbanned bloggers')),
    //             catchError(err => {
    //                 console.log(err);
    //                 return of(null);
    //             }));
    // }
}
