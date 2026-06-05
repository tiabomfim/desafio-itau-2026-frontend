import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PessoaService } from '../../../app/core/service/pessoas.service';

@Component({
  selector: 'app-form-pessoa-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './form-pessoa-modal.component.html',
  styleUrls: ['./form-pessoa-modal.component.css']
})
export class FormPessoaModalComponent implements OnInit {
  form!: FormGroup;
  salvando = signal<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<FormPessoaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pessoa: any }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150), Validators.pattern('^[a-zA-Z\\s]+$')]],
      cpf: ['', [Validators.required, Validators.pattern('^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$|^\\d{11}$')]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      dataNascimento: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.pattern('^\\d{5}-\\d{3}$|^\\d{8}$')]],
      numero: ['', [Validators.required, Validators.maxLength(20)]],
      complemento: ['', [Validators.maxLength(100)]]
    });

    if (this.data.pessoa) {
      this.form.patchValue(this.data.pessoa);
    }
  }

  mascaraCpf(event: any): void {
    let valor = event.target.value.replace(/\D/g, '');
    if (valor.length <= 11) {
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      this.form.controls['cpf'].setValue(valor, { emitEvent: false });
    }
  }

  mascaraCep(event: any): void {
    let valor = event.target.value.replace(/\D/g, '');
    if (valor.length <= 8) {
      valor = valor.replace(/^(\d{5})(\d)/, '$1-$2');
      this.form.controls['cep'].setValue(valor, { emitEvent: false });
    }
  }

  salvar(): void {
    if (this.form.invalid) return;

    this.salvando.set(true);
    const dados = { ...this.form.value };
    
    dados.cpf = dados.cpf.replace(/\D/g, '');
    dados.cep = dados.cep.replace(/\D/g, '');

    const operacao = this.data.pessoa 
      ? this.pessoaService.atualizar(this.data.pessoa.id, dados)
      : this.pessoaService.cadastrar(dados);

    operacao.subscribe({
      next: () => {
        this.snackBar.open(this.data.pessoa ? 'Atualizado com sucesso!' : 'Cadastrado com sucesso!', 'Fechar', { duration: 4000 });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.salvando.set(false);
        if (err.error && err.error.mensagem) {
          this.snackBar.open(err.error.mensagem, 'Fechar', { duration: 5000, verticalPosition: 'top' });
        } else {
          this.snackBar.open('Erro na requisição da operação.', 'Fechar', { duration: 5000, verticalPosition: 'top' });
        }
      }
    });
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}