import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ApiOpenOrderResponse } from '../../models/apiOpenOrderResponse.interface';
@Component({
  selector: 'app-open-orders',
  templateUrl: './open-orders.component.html',
  styleUrls: ['./open-orders.component.scss']
})
export class OpenOrdersComponent implements OnInit {
  openOrders: ApiOpenOrderResponse[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getOpenOrders();
  }

  getOpenOrders() {
    this.apiService.getOpenOrders().subscribe(
      (response: any) => {
        this.openOrders = response.openOrders;
      },
      (error: any) => {
        console.error('API Error:', error);
      }
    );
  }

  getFillPercent(order: ApiOpenOrderResponse): number {
    const fillPercent = (order.fillAmount / order.orderAmount) * 100;
    return parseFloat(fillPercent.toFixed(2));
  }

  getFormattedAmount(amount: number): string {
    return amount.toLocaleString('en-US');
  }
}
