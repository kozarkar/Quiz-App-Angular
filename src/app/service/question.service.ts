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
  
  postMCQanswers(id:any,data : any){
    return this.http.put<any>("http://localhost:3000/mcq_questions/" +id, data)
  }
}
