export interface ApiOpenOrderResponse {
    marketCode: string;
    orderSide: 'BUY' | 'SELL';
    orderDate: Date;
    price: number;
    orderAmount: number;
    fillAmount: number;
  }