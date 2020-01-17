import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User, Role } from '../_models';

const users: User[] = [
    { id: 1, username: 'kcarabuena', password: 'user', firstName: 'Karen', lastName: 'Carabuena',profilePic: 'https://comicvine1.cbsistatic.com/uploads/square_medium/3/32248/627083-mulan_by_ladykitana.png',emailAddress:'kcarabuena@gmail.com',department:'Department 1',address:'Daan Bantayan, Cebu',mobileNo:'09551632415',role: Role.User },
    { id: 2, username: 'asumagang', password: 'admin', firstName: 'Adrian', lastName: 'Sumagang',profilePic:'https://66.media.tumblr.com/15b82816ecff225d50f899f9417c98b0/aab521d1bd5f501e-5f/s640x960/391dbb4654b3ccf48f6aadebb248500fc94f9811.jpg',emailAddress:'asumagang@gmail.com',department:'Department 1',address:'Talamban, Cebu City',mobileNo:'09551632415', role: Role.Admin },
    { id: 3, username: 'imraboy', password: 'pdpo', firstName: 'Ibha', lastName: 'Raboy',profilePic:'https://pbs.twimg.com/media/EDzh7kZUcAAkwFc.jpg' ,emailAddress:'kcarabuena@gmail.com',department:'Department 1',address:'Daan Bantayan, Cebu',mobileNo:'09551632415',role: Role.PDPO},


];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }

        }
        
        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                profilePic: user.profilePic,
                emailAddress: user.emailAddress,
                department:user.department,
                address: user.address,
                mobileNo: user.mobileNo,
                role: user.role,
                token: `fake-jwt-token.${user.id}`
            });
        }

        function getUsers() {
            if (!isAdmin()) return unauthorized();
            if (!isPDPO()) return unauthorized();
            return ok(users);
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            // only admins can access other user records
            if (!isAdmin() && currentUser().id !== idFromUrl()) return unauthorized();

            if (!isPDPO() && currentUser().id !== idFromUrl()) return unauthorized();


            const user = users.find(x => x.id === idFromUrl());
            return ok(user);
        }
        
        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'unauthorized' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }

        function isLoggedIn() {
            const authHeader = headers.get('Authorization') || '';
            return authHeader.startsWith('Bearer fake-jwt-token');
        }

        function isAdmin() {
            return isLoggedIn() && currentUser().role === Role.Admin;
        }

        function isPDPO() {
            return isLoggedIn() && currentUser().role === Role.PDPO;
        }

        function currentUser() {
            if (!isLoggedIn()) return;
            const id = parseInt(headers.get('Authorization').split('.')[1]);
            return users.find(x => x.id === id);
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};