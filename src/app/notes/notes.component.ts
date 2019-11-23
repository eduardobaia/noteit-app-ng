import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { Notebook } from './model/notebook';
import { Note } from './model/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {


  notebooks: Notebook[] = [];
  notes: Note[] = [];
  selectedNotebook: Notebook;
  searchText: string;

  constructor(private apiservice: ApiService) { }

  ngOnInit() {
    this.getAllNotebooks();
    this.getAllNotes(); 
    
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

  getAllNotes(){
    this.apiservice.getAllNotes().subscribe(
      res => {
        this.notes = res;
      },
      err => {
        alert("an error has occured while downloadning the notes")
      }
    );
  }
  createNotebook(){
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

  deleteNote(note: Note){
    if(confirm("Are you sure you want to delete this note?")){
      this.apiservice.deleteNote(note.id).subscribe(
        res => {
          let indexOfNote = this.notes.indexOf(note);
          this.notes.splice(indexOfNote, 1);
        },
        err => {
          alert("Erro while deleting a note!");
        }

      );
    }
  }

  createNote(notebookId: string){
     let newNote: Note = {
       id: null,
       title: "New Note!",
       text:"Write some text here",
       lastModifiedOn: null,
       notebookId: notebookId
      };

      this.apiservice.saveNote(newNote).subscribe(
        res => {
          newNote.id=res.id;
          this.notes.push(newNote);
        },
        err => {alert("An error has occured while save the note");}
      );

  }

  selectNotebook(notebook: Notebook){
    this.selectedNotebook = notebook;
    this.apiservice.getNotesByNotebook(notebook.id).subscribe(
      res => {
        this.notes= res;
      }, 
      err => {
      alert("An error has occured while get all   the notes");
      }
    )
    //TODO grab all the notes for this notbook only
  }

  updateNote(updatedNote: Note){

    this.apiservice.saveNote(updatedNote).subscribe(
      res => {
      }, 
      err => {
      alert("An error has occured while update  the notes");
      }
    )
    //TODO grab all the notes for this notbook only
  }

  selectAllNotes(){
    this.selectedNotebook = null;
    this.getAllNotes();
  }
}