import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  onLoginStatusChange(): void {
    this.isLoggedIn = !this.isLoggedIn; 
  }
}
