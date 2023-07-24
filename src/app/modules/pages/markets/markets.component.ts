import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ApiMarketResponse } from '../../models/apiMarketResponse.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss']
})
export class MarketsComponent implements OnInit {
  markets: ApiMarketResponse[] = [];
  searchTerm = '';
  showTable = true;
  currentQuoteThreshold = 10000;
  filteredMarkets: MatTableDataSource<ApiMarketResponse> = new MatTableDataSource();
  displayedColumns: string[] = ['marketCode', 'currentQuote', 'change24h', 'change24hPercent', 'highestQuote24h', 'lowestQuote24h']; // Sütunlar için diziyi ekleyin

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getMarkets();
  }

  getMarkets(): void {
    this.apiService.getMarkets().subscribe(
      (data) => {
        this.markets = data;
        this.filteredMarkets.data = this.markets;
        this.filterMarkets();
      },
      (error) => {
        console.log('API isteği sırasında hata oluştu:', error);
      }
    );
  }

  filterMarkets(): void {
    this.filteredMarkets.filter = this.searchTerm.trim().toLowerCase();
    this.showTable = this.filteredMarkets.filteredData.length > 0;
  }

  getPositiveChangeMarketsCount(): number {
    return this.filteredMarkets.filteredData.filter((market) => parseFloat(market.change24hPercent) > 0).length;
  }

  getLargestChangeMarket(): ApiMarketResponse | undefined {
    if (this.filteredMarkets.filteredData.length === 0) {
      return undefined;
    }
    let largestChangeMarket: ApiMarketResponse = this.filteredMarkets.filteredData[0];
    for (let i = 1; i < this.filteredMarkets.filteredData.length; i++) {
      const currentMarket = this.filteredMarkets.filteredData[i];
      if (parseFloat(currentMarket.change24hPercent) > parseFloat(largestChangeMarket.change24hPercent)) {
        largestChangeMarket = currentMarket;
      }
    }
    return largestChangeMarket;
  }


  getLargestIncreaseMarket(): ApiMarketResponse | null {
    if (this.filteredMarkets.filteredData.length === 0) {
      return null;
    }

    return this.filteredMarkets.filteredData.reduce((prev, current) =>
      parseFloat(current.change24hPercent) > parseFloat(prev.change24hPercent) ? current : prev
    );
  }

  getLargestDecreaseMarket(): ApiMarketResponse | null {
    if (this.filteredMarkets.filteredData.length === 0) {
      return null;
    }

    return this.filteredMarkets.filteredData.reduce((prev, current) =>
      parseFloat(current.change24hPercent) < parseFloat(prev.change24hPercent) ? current : prev
    );
  }



  getPriceAboveThresholdMarketsCount(): number {
    return this.filteredMarkets.filteredData.filter((market) => parseFloat(market.currentQuote) > this.currentQuoteThreshold).length;
  }

  getPriceBelowThresholdMarketsCount(): number {
    return this.filteredMarkets.filteredData.filter((market) => parseFloat(market.currentQuote) < 1.0).length;
  }

  getPriceAverage(): string {
    const total = this.filteredMarkets.filteredData.reduce((sum, market) => sum + parseFloat(market.currentQuote), 0);
    const average = total / this.filteredMarkets.filteredData.length;
    return average.toFixed(2);
  }

  getBTCtoUSDPrice(): string {
    const btcMarket = this.filteredMarkets.filteredData.find((market) => market.marketCode === 'BTC-TRY');
    const usdtMarket = this.filteredMarkets.filteredData.find((market) => market.marketCode === 'USDT-TRY');
    if (btcMarket && usdtMarket) {
      const btcPrice = parseFloat(btcMarket.currentQuote);
      const usdtPrice = parseFloat(usdtMarket.currentQuote);
      const btcToUSDPrice = btcPrice / usdtPrice;
      return btcToUSDPrice.toFixed(2);
    }
    return 'N/A';
  }

  getPercentColor(change24hPercent: string): { [key: string]: string } {
    const percent = parseFloat(change24hPercent);
    if (percent < 0) {
      return { color: 'red' };
    } else if (percent > 0) {
      return { color: 'green' };
    } else {
      return { color: 'black' };
    }
  }
}