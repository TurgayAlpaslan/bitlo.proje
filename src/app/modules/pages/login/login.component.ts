import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  @Output() loginStatusChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private apiService: ApiService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.loginStatusChange.emit(true);
    }
  }

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Lütfen gerekli alanları doldurunuz.';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Lütfen geçerli bir e-posta adresi giriniz.';
      return;
    }

    this.apiService.login(this.email, this.password)
      .subscribe(
        (response: any) => {
          if (response.code === 0) {
            localStorage.setItem('token', response.token || '');
            this.loginStatusChange.emit(true);
            window.location.href = '/profile';
          } else {
            this.snackBar.open('Kullanıcı adı ya da parola yanlış.', 'Tamam', { duration: 3000 });
          }
        },
        (error: any) => {
          console.error('API Error:', error);
          this.snackBar.open('API isteği sırasında bir hata oluştu.', 'Tamam', { duration: 3000 });
        }
      );
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}
