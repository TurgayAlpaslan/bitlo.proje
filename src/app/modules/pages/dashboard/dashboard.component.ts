import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  name: string = 'Turgay Tarık Alpaslan';
  phoneNumber: string = '05385288219';
  githubLink: string = 'https://github.com/TurgayAlpaslan/bitlo.proje';
  deployLink: string = 'https://bitlo-proje.vercel.app/login';
}
