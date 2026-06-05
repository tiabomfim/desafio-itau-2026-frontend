import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PessoaService } from '../../core/service/pessoas.service';
import { FormPessoaModalComponent } from '../form-pessoa-modal/form-pessoa-modal';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  colunasExibidas: string[] = ['id', 'nome', 'email', 'login', 'cep', 'acoes'];
  
  dadosPessoas = signal<any[]>([]);
  totalElementos = signal<number>(0);
  tamanhoPagina = signal<number>(10);
  paginaAtual = signal<number>(0);
  campoOrdenacao = signal<string>('nome');
  direcaoOrdenacao = signal<string>('asc');
  loading = signal<boolean>(false);
  
  filtroNome = new FormControl('');

  constructor(
    private pessoaService: PessoaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.loading.set(true);
    this.pessoaService.listar(
      this.filtroNome.value,
      this.paginaAtual(),
      this.tamanhoPagina(),
      this.campoOrdenacao(),
      this.direcaoOrdenacao()
    ).subscribe({
      next: (resposta) => {
        this.dadosPessoas.set(resposta.content);
        this.totalElementos.set(resposta.totalElements);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.exibirErro('Falha ao carregar registros da base.');
      }
    });
  }

  pesquisar(): void {
    this.paginaAtual.set(0);
    this.carregarDados();
  }

  aoMudarPagina(evento: PageEvent): void {
    this.paginaAtual.set(evento.pageIndex);
    this.tamanhoPagina.set(evento.pageSize);
    this.carregarDados();
  }

  aoMudarOrdenacao(sort: Sort): void {
    if (!sort.active || !sort.direction) {
      this.campoOrdenacao.set('nome');
      this.direcaoOrdenacao.set('asc');
    } else {
      this.campoOrdenacao.set(sort.active);
      this.direcaoOrdenacao.set(sort.direction);
    }
    this.paginaAtual.set(0);
    this.carregarDados();
  }

  abrirModalCadastro(): void {
    const dialogRef = this.dialog.open(FormPessoaModalComponent, {
      width: '500px',
      data: { pessoa: null }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) this.carregarDados();
    });
  }

  abrirModalEdicao(pessoa: any): void {
    this.loading.set(true);
    this.pessoaService.buscarPorId(pessoa.id).subscribe({
      next: (dadosCompletos) => {
        this.loading.set(false);
        const dialogRef = this.dialog.open(FormPessoaModalComponent, {
          width: '500px',
          data: { pessoa: dadosCompletos }
        });

        dialogRef.afterClosed().subscribe(resultado => {
          if (resultado) this.carregarDados();
        });
      },
      error: () => {
        this.loading.set(false);
        this.exibirErro('Não foi possível buscar os dados detalhados.');
      }
    });
  }

  deletarPessoa(pessoa: any): void {
    if (confirm(`Tem certeza que deseja remover ${pessoa.nome}?`)) {
      this.loading.set(true);
      this.pessoaService.deletar(pessoa.id).subscribe({
        next: () => {
          this.snackBar.open('Registro removido com sucesso!', 'Fechar', { duration: 4000 });
          this.carregarDados();
        },
        error: (err) => {
          this.loading.set(false);
          this.tratarRetornoErro(err);
        }
      });
    }
  }

  private tratarRetornoErro(err: any): void {
    if (err.error && err.error.mensagem) {
      this.exibirErro(err.error.mensagem);
    } else {
      this.exibirErro('Ocorreu um problema inesperado na operação.');
    }
  }

  private exibirErro(mensagem: string): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}