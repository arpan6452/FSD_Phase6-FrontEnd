import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { AuthInterceptorService } from './auth-interceptor.service';

import { ItemCartListService } from './item-cart-list.service';

describe('ItemCartListService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, FormsModule],
    providers: [AuthInterceptorService],
  }));

  it('should be created', () => {
    const service: ItemCartListService = TestBed.get(ItemCartListService);
    expect(service).toBeTruthy();
  });
});
