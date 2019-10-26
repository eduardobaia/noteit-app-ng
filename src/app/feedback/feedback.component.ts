import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {


  model: FeedBackViewModel = {
    name: '',
    email:'',
    feedback:''
  };

  constructor() { }

  ngOnInit() {
  }

}

export interface FeedBackViewModel{
  name: string;
  email: string;
  feedback:string;
}
