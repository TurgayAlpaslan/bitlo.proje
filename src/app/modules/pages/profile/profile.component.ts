import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ApiProfileResponse, UserProfile } from '../../models/apiProfileResponse.interface';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileData: UserProfile | null = null;
  errorMessage: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getProfileData();
  }

  getProfileData() {
    this.apiService.getProfile().subscribe(
      (response: ApiProfileResponse[] | ApiProfileResponse) => {
        if (Array.isArray(response)) {
          this.profileData = response[0].me;
        } else {
          this.profileData = response.me;
        }
      },
      (error: any) => {
        console.error('API Error:', error);
        this.errorMessage = 'Sadece giriş yapmış kullanıcılar bu alanı görüntüleyebilir';
      }
    );
  }

  formatPhoneNumber(phoneNumber: string): string {
    if (phoneNumber && phoneNumber.length === 13) {
      return '+' + phoneNumber.substr(0, 2) + ' ' + phoneNumber.substr(2, 3) + ' ' +
        phoneNumber.substr(5, 3) + ' ' + phoneNumber.substr(8, 2) + ' ' + phoneNumber.substr(10, 2);
    } else {
      return phoneNumber;
    }
  }

  formatDate(date: string): string {
    if (date) {
      const options = { day: 'numeric', month: 'long', year: 'numeric' } as const;
      const formattedDate = new Date(date).toLocaleDateString('tr-TR', options);
      return formattedDate;
    } else {
      return '';
    }
  }
}
