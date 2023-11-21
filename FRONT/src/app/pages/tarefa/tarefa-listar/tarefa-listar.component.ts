import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Categoria } from "src/app/models/categoria.model";
import { Produto } from "src/app/models/produto.model";

@Component({
  selector: "app-produto-cadastrar",
  templateUrl: "./produto-cadastrar.component.html",
  styleUrls: ["./produto-cadastrar.component.css"],
})

export class ProdutoCadastrarComponent {
  nome: string = "";
  descricao: string = "";
  preco: string = "";
  quantidade: string = "";
  categoriaId: number = 0;
  categorias: Categoria[] = [];

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.client
      .get<Categoria[]>("https://localhost:7195/api/categoria/listar")
      .subscribe({
        //A requição funcionou
        next: (categorias) => {
          console.table(categorias);
          this.categorias = categorias;
        },
        //A requição não funcionou
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  cadastrar(): void {
    let produto: Produto = {
      nome: this.nome,
      descricao: this.descricao,
      preco: Number.parseFloat(this.preco),
      quantidade: Number.parseInt(this.quantidade),
      categoriaId: this.categoriaId,
    };

    this.client
      .post<Produto>(
        "https://localhost:7195/api/produto/cadastrar",
        produto
      )
      .subscribe({
        //A requição funcionou
        next: (produto) => {
          this.snackBar.open(
            "Produto cadastrado com sucesso!!",
            "E-commerce",
            {
              duration: 1500,
              horizontalPosition: "right",
              verticalPosition: "top",
            }
          );
          this.router.navigate(["pages/produto/listar"]);
        },
        //A requição não funcionou
        error: (erro) => {
          console.log(erro);
        },
      });
  }
}