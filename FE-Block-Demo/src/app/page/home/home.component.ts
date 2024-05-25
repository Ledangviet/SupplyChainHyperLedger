import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ProductService } from '../../service/customApi.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface ProductType {
  id: string;
  name: string;
  linkImg: string;
  quantity: number;
  priceSale: number;
  unit: string;
  isStatus: boolean;
  supplierId: string;
  supplierName: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  baseUrl = environment.baseUrl;

  listProducts: ProductType[] = [];

  idSupplier: string = '';

  nameSupplier: string = '';

  checkLog = true;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getAllProduct();
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

  getAllProduct() {
    this.productService.getAll(this.baseUrl + 'Product').subscribe((data) => {
      this.listProducts = data;
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
