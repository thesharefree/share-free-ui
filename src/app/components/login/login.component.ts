import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Patterns } from 'src/app/shared/patterns/patterns';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router, private auth: AngularFireAuth) {}

  error: string | null = null;
  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(Patterns.emailPattern),
    ]),
    password: new FormControl('', [
      Validators.required,
      //Validators.pattern(Patterns.passPattern),
    ]),
  });

  login() {
    if (this.form.valid) {
      this.auth
        .signInWithEmailAndPassword(
          this.form.value.email,
          this.form.value.password
        )
        .then(fbUser => {
          console.log('Firebase User', fbUser);
          this.router.navigate(['/admin']);
        }).catch(error => {
          this.error = error?.message;
        });
    } else {
    }
  }
}
