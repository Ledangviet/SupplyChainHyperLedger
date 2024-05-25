import { Component, OnChanges, OnInit } from '@angular/core';
import { ProductService } from '../../service/customApi.service';
import { Router } from 'express';
import { environment } from '../../../environments/environment.development';
import { ProductType } from '../home/home.component';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [FormsModule, CommonModule, FormsModule],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css',
})
export class DetailProductComponent implements OnInit {
  baseUrl = environment.baseUrl;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  quantityInput: number = 1;

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

  idProduct: string = '';

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const myData = params['myData'];
      this.idProduct = myData;
    });
    this.getById(this.idProduct);
  }

  getById(id: string) {
    this.productService
      .getAll(this.baseUrl + 'Product/' + id)
      .subscribe((data) => (this.product = data));
  }
}
