import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ProductService } from '../../service/customApi.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductType } from '../home/home.component';
import { OrderType } from '../my-cart/my-cart.component';

@Component({
  selector: 'app-my-approve',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-approve.component.html',
  styleUrl: './my-approve.component.css',
})
export class MyApproveComponent {
  baseUrl = environment.baseUrl;

  listOrders: OrderType[] = [];

  idSupplier: string = '';

  nameSupplier: string = '';

  checkLog = true;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getAllOrder();
    this.check();
  }
  check() {
    var checkUser = localStorage.getItem('id');
    if (checkUser != null) {
      this.checkLog = false;
    } else {
      this.checkLog = true;
    }
  }

  getAllOrder() {
    this.productService.getAll(this.baseUrl + `/batch/all/${localStorage.getItem('id')}`).subscribe((data) => {
      this.listOrders = data;
      this.idSupplier = data.supplierId;
    });
  }

  onClickCheckOut(id: string) {
    this.router.navigate(['/detail-product'], { queryParams: { myData: id } });
  }

  clickLogin() {
    this.router.navigateByUrl('/login');
  }
  clickLogout() {
    localStorage.removeItem('id');
    this.router.navigateByUrl('/login');
  }
  clickMyStore() {
    this.router.navigateByUrl('/my-store');
  }
}
