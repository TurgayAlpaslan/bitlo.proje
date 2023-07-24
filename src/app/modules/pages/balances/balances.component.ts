import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ApiBalanceResponse } from '../../models/apiBalanceResponse.interface';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.scss']
})
export class BalancesComponent implements OnInit {
  balances: ApiBalanceResponse[] = [];
  showLowBalancesOnly: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getBalances();
  }

  getBalances() {
    this.apiService.getBalances().subscribe(
      (response: any) => {
        this.balances = response.balances;
      },
      (error: any) => {
        console.error('API Error:', error);
      }
    );
  }

  formatNumberWithCommas(value: number): string {
    return value.toLocaleString('en-US');
  }

  toggleLowBalancesVisibility() {
    this.showLowBalancesOnly = !this.showLowBalancesOnly;
  }

  filterLowBalances(): ApiBalanceResponse[] {
    if (this.showLowBalancesOnly) {
      return this.balances.filter(balance => balance.availableAmountTRYValue >= 1);
    } else {
      return this.balances;
    }
  }
}
