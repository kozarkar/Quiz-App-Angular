import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http"


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http : HttpClient) { }

  getMCQquestions(){
    return this.http.get<any>("http://localhost:3000/mcq_questions");
  }

  getFITBquestions(){
    return this.http.get<any>("http://localhost:3000/fitb_questions");
  }
}
