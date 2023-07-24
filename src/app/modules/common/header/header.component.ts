import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToMarkets() {
    this.router.navigate(['/marketler']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToBalances() {
    this.router.navigate(['/profil/bakiyeler']);
  }

  goToOpenOrders() {
    this.router.navigate(['/profil/acik-emirler']);
  }
}
