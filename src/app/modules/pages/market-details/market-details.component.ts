import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ApiMarketResponse } from '../../models/apiMarketResponse.interface';

@Component({
  selector: 'app-market-details',
  templateUrl: './market-details.component.html',
  styleUrls: ['./market-details.component.scss']
})
export class MarketDetailsComponent implements OnInit {
  marketCode: string | null = null;
  marketDetails: ApiMarketResponse | null = null;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.marketCode = params.get('marketCode');
      this.fetchMarketData();
    });
  }

  fetchMarketData() {
    this.apiService.getMarkets().subscribe(data => {
      this.marketDetails = data.find(market => market.marketCode === this.marketCode) || null;
    });
  }

  getFormattedAmount(value: number): string {
    return value ? value.toLocaleString('en-US') : 'N/A';
  }

  getChange24hPercentColor(): { color: string } {
    if (this.marketDetails) {
      const change24hPercent = +this.marketDetails.change24hPercent ?? 0;
      return change24hPercent < 0 ? { color: 'red' } : change24hPercent > 0 ? { color: 'green' } : { color: 'black' };
    }
    return { color: 'black' }; // Varsayılan renk
  }
  
  
  
  

  getAssetLogoUrl(): string {
    const baseAsset = this.marketCode?.split('-')[0].toLowerCase() || '';
    return `https://static.bitlo.com/cryptologossvg/${baseAsset}.svg`;
  }
}
