import {
  Component,
  Inject,
  OnChanges,
  OnInit,
  afterNextRender,
} from '@angular/core';
import { ProductService } from '../../service/customApi.service';
import { environment } from '../../../environments/environment.development';
import { ProductType } from '../home/home.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-store',
  standalone: true,
  imports: [FormsModule, CommonModule, FormsModule],
  templateUrl: './my-store.component.html',
  styleUrl: './my-store.component.css',
})
export class MyStoreComponent {
  baseUrl = environment.baseUrl;

  constructor(private productService: ProductService, private router: Router) {}

  checkEdit = true;

  checkCreate = true;

  listProducts: ProductType[] = [];

  product: ProductType = {
    id: '',
    name: '',
    linkImg: '',
    quantity: 0,
    priceSale: 0,
    unit: '',
    isStatus: true,
    supplierId: '',
    supplierName: '',
  };

  ngOnInit() {
    this.getAllProduct();
  }
  getAllProduct() {
    this.listProducts = [];
    this.productService.getAll(this.baseUrl + 'product/').subscribe((data) => {
      this.listProducts = data;
    });
  }
  onClickEdit() {
    this.checkEdit = !this.checkEdit;
    this.checkCreate = true;
  }
  onClickCreate() {
    this.checkCreate = !this.checkCreate;
    this.checkEdit = true;
  }
  onClickHome() {
    this.router.navigateByUrl('');
  }


  createProduct(model: any ){
    this.productService.addProduct(this.baseUrl + 'product/',model).subscribe((data) => {
      this.listProducts = data;
    });
  }
}
