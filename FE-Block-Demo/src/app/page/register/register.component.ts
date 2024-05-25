import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductService } from '../../service/customApi.service';
import { environment } from '../../../environments/environment.development';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private productService: ProductService, private router: Router) {}

  baseUrl = environment.baseUrl;

  faEnvelope = faEnvelope;
  faLock = faLock;
  faUser = faUser;

  adress: string = '';
  name: string = '';
  selectedValue: string = 'user';
  emailInput: string = '';
  passwordInput: string = '';

  login(email: string, pass: string) {
    this.productService
      .get(this.baseUrl + '/user/register', {loggedUserType: this.selectedValue,loggedUserId: email,adress: this.adress, name : this.name, email: email, password: pass })
      .subscribe((data) => {
        if (data != null) {
          this.router.navigateByUrl('/login');
        } else {
          alert('Register failed!');
        }
      });
  }

  onClickLogin() {
    this.login(this.emailInput, this.passwordInput);
  }
}
