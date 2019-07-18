import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../@core/utils/message.service';
import { Blogger } from '../@core/data/blogger';
import { NbAuthService } from '@nebular/auth';



const apiUrl = 'http://springboot-aws.arimnh62mr.us-east-2.elasticbeanstalk.com';

@Injectable({ providedIn: 'root' })

export class BloggerService {
    constructor(
        private http: HttpClient,
        private messageService: MessageService,
        private auth: NbAuthService) { }

    // getMe(): Observable<User> {
    //     return this.http.get<User>(apiUrl + '/auth/admin/me')
    //         .pipe(tap(_ => console.log('fetched user')),
    //         catchError(err => {
    //             console.log(err);
    //             return of(null);
    //         }));
    // }

    getAll(): Observable<Blogger[]> {
        return this.http.get<Blogger[]>(apiUrl + '/external/get')
        .pipe(tap(_ => console.log('fetched bloggers')),
        catchError(err => {
            console.log(err);
            return of(null);
        }));
    }

    banBlogger(bloggerEmail: string): boolean {
        this.http.put(apiUrl + '/external/ban', {email: bloggerEmail, status: false})
        .pipe(catchError(err => {
            console.log(err);
            return of(false);
        }));
        return true;
    }

    unbanBlogger(bloggerEmail: string): boolean {
        this.http.put(apiUrl + '/external/ban', {email: bloggerEmail, status: true})
        .pipe(catchError(err => {
            console.log(err);
            return of(false);
        }));
        return true;
    }

    // getAll(): Blogger[] {
    //     return [
    //         {id: 0, fullname: 'Nguyen Van A', email: 'blogger1@gmail.com', active: true},
    //         {id: 1, fullname: 'Nguyen Van A', email: 'blogger2@gmail.com', active: true},
    //         {id: 2, fullname: 'Nguyen Van A', email: 'blogger3@gmail.com', active: true},
    //         {id: 3, fullname: 'Nguyen Van A', email: 'blogger4@gmail.com', active: true},
    //         {id: 4, fullname: 'Nguyen Van A', email: 'blogger5@gmail.com', active: true},
    //         {id: 5, fullname: 'Nguyen Van A', email: 'blogger6@gmail.com', active: true},
    //         {id: 6, fullname: 'Nguyen Van A', email: 'blogger7@gmail.com', active: true},
    //         {id: 7, fullname: 'Nguyen Van A', email: 'blogger8@gmail.com', active: true},
    //         {id: 8, fullname: 'Nguyen Van A', email: 'blogger9@gmail.com', active: true},
    //         {id: 9, fullname: 'Nguyen Van A', email: 'blogger10@gmail.com', active: true},
    //         {id: 10, fullname: 'Nguyen Van A', email: 'blogger11@gmail.com', active: true},
    //         {id: 11, fullname: 'Nguyen Van A', email: 'blogger12@gmail.com', active: true},
    //         {id: 12, fullname: 'Nguyen Van A', email: 'blogger13@gmail.com', active: true},
    //         {id: 13, fullname: 'Nguyen Van A', email: 'blogger14@gmail.com', active: true},
    //         {id: 14, fullname: 'Nguyen Van A', email: 'blogger15@gmail.com', active: true},
    //         {id: 15, fullname: 'Nguyen Van A', email: 'blogger16@gmail.com', active: true},
    //         {id: 16, fullname: 'Nguyen Van A', email: 'blogger17@gmail.com', active: true},
    //         {id: 17, fullname: 'Nguyen Van A', email: 'blogger18@gmail.com', active: true},
    //         {id: 18, fullname: 'Nguyen Van A', email: 'blogger19@gmail.com', active: true},
    //         {id: 19, fullname: 'Nguyen Van A', email: 'blogger20@gmail.com', active: true}
    //     ];
    // }
}
