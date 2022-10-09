import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Token {
    access_token: string = '';
    expires_in: number = 0;

    deepCopy(token: Token) {
        this.access_token = token.access_token;
        this.expires_in = token.expires_in;
    }
}
