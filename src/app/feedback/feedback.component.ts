import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }


  sendFeedback(): void{
    let url = "http://localhost:8082/api/feedback";
     this.http.post(url, this.model).subscribe(
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
