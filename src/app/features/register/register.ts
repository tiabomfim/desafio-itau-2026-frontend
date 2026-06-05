import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./auth-shared.css']
})
export class RegisterComponent {
  form: FormGroup;
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  hidePassword = signal<boolean>(true);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(150),
        Validators.pattern('^[a-zA-Z\\s]+$')
      ]],
      email: ['', [
        Validators.required, 
        Validators.email,
        Validators.maxLength(100)
      ]],
      senha: ['', [
        Validators.required, 
        Validators.minLength(6), 
        Validators.maxLength(20)
      ]]
    });
  }

  togglePassword(): void {
    this.hidePassword.update(value => !value);
  }

  cadastrar(): void {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.error.set(null);

    this.authService.register(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading.set(false);
        if (err.error && err.error.mensagem) {
          this.error.set(err.error.mensagem);
        } else {
          this.error.set('Ocorreu um erro ao realizar o cadastro. Tente novamente.');
        }
      }
    });
  }
}