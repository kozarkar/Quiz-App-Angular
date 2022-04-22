import { Router } from '@angular/router';
import { QuestionService } from './../service/question.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mcq-question',
  templateUrl: './mcq-question.component.html',
  styleUrls: ['./mcq-question.component.scss']
})
export class McqQuestionComponent implements OnInit {

  mcqQuestionList : any = [];
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
  display_s:any;
  display_m:any;

  constructor(private questionservice: QuestionService, private routerLink : Router) { }

  ngOnInit(): void {
    this.getAllMCQquestions();
  }

    getAllMCQquestions(){
      this.questionservice.getMCQquestions()
      .subscribe(res=>{
        this.mcqQuestionList = res;
      })
      this.timer();
      this.display_s  = Number(this.formated_s);
      this.display_m = Number(this.formated_m);
    }

    nextQuestion(){
      this.currentQuestion++;
      this.getProgressPercent();
      if(this.selection[this.currentQuestion] != null){
        this.op = this.selection[this.currentQuestion]
      }else{
        this.op = null;
      }
    }

    previousQuestion(){
      this.currentQuestion--;
      this.op = this.selection[this.currentQuestion];
      this.getProgressPercent();
    }

    answer(currentQno: number, i:any, option:any){
      this.selection[currentQno-1]= i;
      
      let indicator = document.querySelectorAll(".navigator div");
      indicator[currentQno-1].classList.add("fill");
    
      if(option.correct){
      this.correctAnswer++;
      this.getProgressPercent();
      }else{
      this.inCorrectAnswer++;
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
      this.progress = ((this.currentQuestion/(this.mcqQuestionList.length-1))*100).toString();
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

    exit(){
        if(confirm("Are you sure you want to exit the quiz?")){
          this.routerLink.navigate(["/welcome"]);
        }
   
    }
}

