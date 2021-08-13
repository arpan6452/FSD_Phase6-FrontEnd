import { ReactiveFormsModule } from '@angular/forms';
import { ItemServiceService } from './../common/item-service.service';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenupageComponent } from './menupage.component';
import { UserServiceService } from '../common/user-service.service';
import { AuthInterceptorService } from '../common/auth-interceptor.service';
import { AppRoutingModule } from '../app-routing.module';

describe('MenupageComponent', () => {
  let component: MenupageComponent;
  let fixture: ComponentFixture<MenupageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenupageComponent ],
      imports: [HttpClientModule, ReactiveFormsModule, AppRoutingModule],
      providers: [UserServiceService, ItemServiceService, AuthInterceptorService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenupageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
