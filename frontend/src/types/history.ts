export interface HistoryType {
  _id?: string;
  userId: string;
  items: {
    productId: string;
    title: string;
    category: string;
    image: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  addressId: string;
  createdAt?: Date;
}
