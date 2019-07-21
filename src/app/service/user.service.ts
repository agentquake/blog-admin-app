import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../@core/utils/message.service';
import { User } from '../@core/data/user';
import { NbAuthService } from '@nebular/auth';



const apiUrl = 'http://blogwebsite.us-east-2.elasticbeanstalk.com';

@Injectable({ providedIn: 'root' })

export class UserService {
    constructor(
        private http: HttpClient,
        private messageService: MessageService,
        private auth: NbAuthService) { }

    getMe(): Observable<User> {
        return this.http.get<User>(apiUrl + '/auth/admin/me')
            .pipe(tap(_ => console.log('fetched user')),
            catchError(err => {
                console.log(err);
                return of(null);
            }));
    }
}
