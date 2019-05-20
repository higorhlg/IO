import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cartao-cadastro-usuario',
  templateUrl: './cartao-cadastro-usuario.component.html',
  styleUrls: ['./cartao-cadastro-usuario.component.scss']
})
export class CartaoCadastroUsuarioComponent implements OnInit {
  
  novouser = {
    nome:'',
    datanascimento:'',
    cpf:'',
    endereco:'',
    usuario:'',
    telefone:'',
    celular:'',
    email:'',
    senha:''
  }
  constructor() { }

  ngOnInit() {
  }

  onSubmit(e){
    console.log(e);
  }
}
