import { Injectable } from '@angular/core';
import { BackendService, Method } from 'core';
import { Observable } from 'rxjs';
import { ProductDto } from '../dtos/product-dto';

@Injectable()
export class ProductsConnectorService {
  private serviceName = '';

  constructor(private backendService: BackendService) {}

  setApiUrl(url: string) {
    this.backendService.apiUrl = url;
  }

  fetch(): Observable<ProductDto[]> {
    const url = 'products';
    return this.backendService.connect(url, Method.GET);
  }

  create(productDto: ProductDto): Observable<any> {
    const url = 'products';
    return this.backendService.connect(url, Method.POST, productDto);
  }

  update(productId: string, productDto: ProductDto): Observable<any> {
    const url = 'products/' + productId;
    return this.backendService.connect(url, Method.PUT, productDto);
  }

  delete(productId: string): Observable<any> {
    const url = 'products/' + productId;
    return this.backendService.connect(url, Method.DELETE);
  }
}
