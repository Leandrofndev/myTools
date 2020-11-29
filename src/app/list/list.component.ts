import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Modelagem dos dados
export interface Tool{
  brand: string;
  category: string;
  date: string;
  description: string;
  image: string;
  model: string;
  name: string;

}

// Modelagem com Id do documento
export interface ToolId extends Tool{
  id: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  // Atributos


  // Obtem a coleção do Firestore, conforme o modelo acima
  private toolColection: AngularFirestoreCollection<Tool>;

  // Objeto Tool é do tipo assícrono e recebe os dados do Db

  tools: Observable<ToolId[]>;

  // Campo usado para ordenação dos dados
  orderBy: string;

  // Direção da ordenação dos dados (ascendente ou descendente)
  orderDr: any;

  constructor(private db: AngularFirestore) {

    // Ordena o título ao carregar
    this.orderBy = "name",

    // Em ordem ascendente
    this.orderDr = "asc"

   }

  ngOnInit(): void {

    // Atualiza a lista de Ferramentas
    this.getList();

  }

  getList(){
    // referência a coleção
    this.toolColection = this.db.collection<Tool>('tools', ref => ref.orderBy(this.orderBy, this.orderDr));

    // Obtém os documentos da coleção
    this.tools = this.toolColection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Tool;
        const id = a.payload.doc.id;

    // Retorna documentos quando forem obtidos
    return {id, ...data};

      })) 
    );

  }

  // Altera o campo usado para ordenar a lista
  changeOrderField(field: string){

    if (this.orderBy !== field){
      this.orderBy = field;
      this.getList();//Atualiza de acordo com o parâmetro
    }return false;

  }

  changeOrderDir(direction: any){

    if(this.orderDr !== direction){
      this.orderDr = direction;
      this.getList();
    }return false;
    

  }

}
