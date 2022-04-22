import { QuestionService } from './../service/question.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-fitb-question',
  templateUrl: './fitb-question.component.html',
  styleUrls: ['./fitb-question.component.scss']
})
export class FitbQuestionComponent implements OnInit {

  fitbQuestionList : any = [];
  currentQuestion : number = 0;
  correctAnswer: number = 0;
  inCorrectAnswer: number =0;
  selection: any = [];
  op: any ;
  progress: string ="0";
  stopTimer : any;
  quizShow: boolean = true;
  resultShow: boolean = false;
  bgColor:any;
  new_seconds = 0;
  new_minutes = 5;
  formated_s:any ='00';
  formated_m:any ='05';

  
  constructor(private questionservice: QuestionService) { }

  ngOnInit(): void {
    this.getAllFITBquestions();
    }


  getAllFITBquestions(){
    this.questionservice.getFITBquestions()
    .subscribe(res=>{
      this.fitbQuestionList = res;
    })
    this.timer();
  }
  
  nextQuestion(currentQ:any){
    if(this.op != null){
      this.answer(currentQ);
    }
    this.currentQuestion++;
    this.getProgressPercent();
    if(this.selection[this.currentQuestion] != null){
      this.op = this.selection[this.currentQuestion]
      
    }else{
      
      this.op = null;
    }
  }

  previousQuestion(currentQuestion :any){
    if(this.op != null){
      this.answer(currentQuestion);
    }
    this.currentQuestion--;
    this.op = this.selection[this.currentQuestion];
    this.getProgressPercent();
  }

  answer(currentQno: any){
    this.selection[currentQno]= this.op;
    let indicator = document.querySelectorAll(".navigator div");
    indicator[currentQno].classList.add("fill");
  
    if(this.op == this.fitbQuestionList[currentQno].answer){
      this.correctAnswer++;
      console.log("correct");
      this.bgColor = "green";
      this.getProgressPercent();
    }else{
      this.inCorrectAnswer++;
      console.log("incorrect");
      this.bgColor = "red";
      this.getProgressPercent();
    }
  }

  timer(){
    this.stopTimer = setInterval(()=>{
      if(this.quizShow == true){
        if(this.new_seconds ==0 && this.new_minutes !=0){
            this.new_minutes--; 
            this.new_seconds = 60;
    } else if(this.new_seconds ==0 && this.new_minutes ==0){
      this.showResults();
    }
         this.new_seconds--;      
  }     
     this.formated_s = this.new_seconds < 10 ? `0${this.new_seconds}` : `${this.new_seconds}`;
     this.formated_m = this.new_minutes < 10 ? `0${this.new_minutes}` : `${this.new_minutes}`;
    },1000)
  }

  getProgressPercent(){
    this.progress = ((this.currentQuestion/(this.fitbQuestionList.length-1))*100).toString();
    return this.progress;
  }

  showResults(){
    this.resultShow = true;
    this.quizShow = false;
  }
  getQuestions(i:any){
    this.currentQuestion =i;
    this.getProgressPercent();
    if(this.selection[this.currentQuestion] != null){
      this.op = this.selection[this.currentQuestion]  
    }else{  
      this.op = null;
    }
  }
}
