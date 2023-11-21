import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-categoria-listar',
  templateUrl: './categoria-listar.component.html',
  styleUrls: ['./categoria-listar.component.css']
})
export class CategoriaListarComponent {
  colunasTabela: string[] = [
    "id",
    "nome",
    "criadoEm",
    "deletar",
  ];
  categorias: Categoria[] = [];

  constructor(
    private client: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.client
      .get<Categoria[]>("https://localhost:7195/api/categoria/listar")
      .subscribe({
        //Requisição com sucesso
        next: (categorias) => {
          console.table(categorias);
          this.categorias = categorias;
        },
        //Requisição com erro
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  deletar(categoriaId: number) {
    this.client
      .delete<Categoria[]>(
        `https://localhost:7195/api/categoria/deletar/${categoriaId}`
      )
      .subscribe({
        //Requisição com sucesso
        next: (categorias) => {
          this.categorias = categorias;
          this.snackBar.open(
            "Categoria deletado com sucesso!!",
            "E-commerce",
            {
              duration: 1500,
              horizontalPosition: "right",
              verticalPosition: "top",
            }
          );
        },
          //Requisição com erro
          error: (erro) => {
            console.log(erro);
        },
      });
  }
}