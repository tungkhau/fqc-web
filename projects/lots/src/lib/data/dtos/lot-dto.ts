export interface LotDto {
  id?: string;
  code?: string;
  expectedQuantity?: number;
  expectedWeight?: number;
  orderCode?: string;
  measurement?: {
    id?: string;
    totalWidth?: string;
    usableWidth?: string;
    areaDensity?: string;
  };
}
