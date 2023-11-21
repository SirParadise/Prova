import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Categoria } from "src/app/models/categoria.model";

@Component({
  selector: 'app-categoria-cadastrar',
  templateUrl: './categoria-cadastrar.component.html',
  styleUrls: ['./categoria-cadastrar.component.css']
})
export class CategoriaCadastrarComponent {
  nome: string = "";

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  cadastrar(): void {
    let categoria: Categoria = {
      nome: this.nome,
    };

    this.client
      .post<Categoria>(
        "https://localhost:7195/api/categoria/cadastrar",
        categoria
      )
      .subscribe({
        //A requição funcionou
        next: (categoria) => {
          this.snackBar.open(
            "Categoria cadastrada com sucesso!!",
            "E-commerce",
            {
              duration: 1500,
              horizontalPosition: "right",
              verticalPosition: "top",
            }
          );
          this.router.navigate(["pages/categoria/listar"]);
        },
        //A requição não funcionou
        error: (erro) => {
          console.log(erro);
        },
      });
  }
}