import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { AuthInterceptorService } from './auth-interceptor.service';

import { ItemServiceService } from './item-service.service';

describe('ItemServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, FormsModule],
    providers: [AuthInterceptorService],
  }));

  it('should be created', () => {
    const service: ItemServiceService = TestBed.get(ItemServiceService);
    expect(service).toBeTruthy();
  });
});
