import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class Patterns {
    static paramNamePattern: string = '[0-9a-zA-Z_\\-]{1,20}';
    static namePattern: string = '[0-9a-zA-Z_\\- ]{5,50}';
    static emailPattern: string = '([a-zA-Z0-9_.]{1,})((@[a-zA-Z]{2,})[\\\.]([a-zA-Z]{2}|[a-zA-Z]{3}))';
    static mobilePattern: string = '\\d{10}';
    static amountPattern: string = '\\d{1,7}';
    static numberPattern: string = '\\d{1,4}';
    static passPattern: string = '/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/';
    static codePattern: string = '[0-9a-zA-Z\\-\\/]{3,16}';
    static gstinPattern: string = '[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9A-Za-z]{1}[Z]{1}[0-9a-zA-Z]{1}';
}