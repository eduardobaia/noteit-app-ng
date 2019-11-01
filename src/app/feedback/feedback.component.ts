
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

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

  constructor(private apiservice: ApiService) { }

  ngOnInit() {
  }


  sendFeedback(): void{
     this.apiservice.postFeedback(this.model).subscribe(
       res => {
         //reload page when sucess
         location.reload();
       },
       err => {
         alert("An error has occurred while sending feedback");
       }
     );
  }  
}

export interface FeedBackViewModel{
  name: string;
  email: string;
  feedback:string;
}
