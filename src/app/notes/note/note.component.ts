import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Note } from '../model/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {


  @Input() note: Note; 
  @Output() updatedNote : EventEmitter<Note> = new EventEmitter<Note>();
  @Output() deletedNote : EventEmitter<Note> = new EventEmitter<Note>();



  constructor() { }

  ngOnInit() {
  }


  updateNote(){
    this.updatedNote.emit(this.note);
  }

  deleteNote(){
    this.deletedNote.emit(this.note);
  }
}
