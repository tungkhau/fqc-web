export interface LotDto {
  id?: string;
  code?: string;
  expectedQuantity?: number;
  expectedWeight?: number;
  orderCode?: string;
  productId: string;
  measurement?: {
    id?: string;
    totalWidth?: number;
    usableWidth?: number;
    areaDensity?: number;
  };
  totalWidth?: number;
  usableWidth?: number;
  areaDensity?: number;
}
