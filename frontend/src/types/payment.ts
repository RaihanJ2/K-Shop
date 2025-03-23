export interface PaymentProps {
  amount: number;
  userId: string;
  onSuccess: () => void;
  onCancel: () => void;
}
