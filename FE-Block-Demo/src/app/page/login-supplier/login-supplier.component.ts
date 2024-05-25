import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductService } from '../../service/customApi.service';
import { environment } from '../../../environments/environment.development';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-supplier',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, RouterLink],
  templateUrl: './login-supplier.component.html',
  styleUrl: './login-supplier.component.css',
})
export class LoginSupplierComponent {
  constructor(private productService: ProductService, private router: Router) {}

  baseUrl = environment.baseUrl;

  faEnvelope = faEnvelope;
  faLock = faLock;
  faUser = faUser;

  selectedValue: string = 'user';
  emailInput: string = '';
  passwordInput: string = '';

  login(email: string, pass: string) {
    this.productService
      .get(this.baseUrl + '/user/signin', { email: email, password: pass })
      .subscribe((data) => {
        if (data != null) {
          localStorage.setItem('id', data.id);
          localStorage.setItem('name', data.name);
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('role', this.selectedValue);
          localStorage.setItem('userType', data.userType);
          this.router.navigateByUrl('');
        } else {
          alert('Invalid email or password!');
        }
      });
  }

  onClickLogin() {
    this.login(this.emailInput, this.passwordInput);
  }
}
