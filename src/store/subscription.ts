export interface SubscriptionItem {
  item: string;
  amount: number;
  quantity: number;
}

export interface SubscriptionData {
  title: string;
  amount: number;
  discount: number;
  totalAmount: number;
  items: SubscriptionItem[];
}