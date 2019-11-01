import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { Notebook } from './model/notebook';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {


  notebooks: Notebook[] = [];

  constructor(private apiservice: ApiService) { }

  ngOnInit() {
    this.getAllNotebooks();
  }


  getAllNotebooks(){
     this.apiservice.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res;
      },
      err => {
        alert("an error has occured")
      }
    );
  }

  createNotebook(){
    alert("entrou aqui");
    let newNotebook: Notebook = {
      name:'New notbook',
      id: null,
      nbOfNotes: 0
    }
     this.apiservice.postNotebook(newNotebook).subscribe(
       res => {
         newNotebook.id = res.id;
         this.notebooks.push(newNotebook);
       },
       err => {
        alert("An error has occured while savinf the notebooj");
       }
     );
  }


  updateNotebook(updatedNotebook: Notebook){

    this.apiservice.postNotebook(updatedNotebook).subscribe(
      res => {
      },
      err => {alert("An error has occured while updating the notebook");}
    );

  }


  deleteNotebook (notebook: Notebook){
    if(confirm("Are you sure you want to delete notebook?")){
      this.apiservice.deleteNotebook(notebook.id).subscribe(
        res => {
          //get the index of actual notbook to delete of the list
          let indexOfNotebook = this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfNotebook,1);
        },
        err => {alert("An error has occured while deleting the notebook");}
      );
    }
  }

}