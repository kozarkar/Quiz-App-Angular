import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http : HttpClient) { }

  getMCQquestions(){
    return this.http.get<any>("https://my-json-server.typicode.com/kozarkar/Quiz-App-Angular/mcq_questions");
  }

  getFITBquestions(){
    return this.http.get<any>("https://my-json-server.typicode.com/kozarkar/Quiz-App-Angular/fitb_questions");
  }
}
