import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Categoria } from "src/app/models/categoria.model";
import { Produto } from "src/app/models/tarefa.model";

@Component({
  selector: "app-produto-alterar",
  templateUrl: "./produto-alterar.component.html",
  styleUrls: ["./produto-alterar.component.css"],
})
export class ProdutoAlterarComponent {
  tarefaId: number = 0;
  nome: string = "";
  descricao: string = "";
  status: string = "Não iniciada";
  categoriaId: number = 0;
  categorias: Categoria[] = [];

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (parametros) => {
        let { id } = parametros;
        this.client
          .get<Produto>(
            `https://localhost:7195/api/tarefa/buscar/${id}`
          )
          .subscribe({
            next: (tarefa) => {
              this.client
                .get<Categoria[]>(
                  "https://localhost:7195/api/categoria/listar"
                )
                .subscribe({
                  next: (categorias) => {
                    this.categorias = categorias;

                    this.tarefaId = tarefa.produtoId!;
                    this.nome = tarefa.nome;
                    this.descricao = tarefa.descricao;
                    this.status = tarefa.status;
                    this.categoriaId = tarefa.categoriaId;
                  },
                  error: (erro) => {
                    console.log(erro);
                  },
                });
            },
            //Requisição com erro
            error: (erro) => {
              console.log(erro);
            },
          });
      },
    });
  }

  alterar(): void {
    let tarefa: Tarefa = {
      nome: this.nome,
      descricao: this.descricao,
      status: this.status,
      categoriaId: this.categoriaId,
    };

    console.log(tarefa);

    this.client
      .put<Tarefa>(
        `https://localhost:7195/api/tarefa/alterar/${this.tarefaId}`,
        tarefa
      )
      .subscribe({
        //A requição funcionou
        next: (produto) => {
          this.snackBar.open(
            "Tarefa alterado com sucesso!!",
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