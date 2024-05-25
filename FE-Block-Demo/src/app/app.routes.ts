import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { LoginSupplierComponent } from './page/login-supplier/login-supplier.component';
import { DetailProductComponent } from './page/detail-product/detail-product.component';
import { MyStoreComponent } from './page/my-store/my-store.component';
import { MyCartComponent } from './page/my-cart/my-cart.component';
import { RegisterComponent } from './page/register/register.component';
import { MyApproveComponent } from './page/my-approve/my-approve.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginSupplierComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'detail-product',
    component: DetailProductComponent,
  },
  {
    path: 'my-store',
    component: MyStoreComponent,
  },
  {
    path: 'my-cart',
    component: MyCartComponent,
  },
  {
    path: 'my-approve',
    component: MyApproveComponent,
  },
];
