import { QuestionService } from './../service/question.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-fitb-question',
  templateUrl: './fitb-question.component.html',
  styleUrls: ['./fitb-question.component.scss']
})
export class FitbQuestionComponent implements OnInit {


  public fitbQuestionList : any = [];
  public currentQuestion : number = 0;
  correctAnswer: number = 0;
  inCorrectAnswer: number =0;
  selection: any = [];
  op: any ;
  progress: string ="0";
  stopTimer : any;
  time = 0;
  dt = new Date(new Date().setTime(0));
  ctime = this.dt.getTime();
  seconds = Math.floor((this.ctime % (1000*60))/1000);
  minutes = Math.floor((this.ctime % (1000*60*60))/(1000*60));
  formated_sec : any = "00";
  formated_min : any = "00";
  quizShow: boolean = true;
  resultShow: boolean = false;
  bgColor:any;


  constructor(private questionservice: QuestionService) { }

  ngOnInit(): void {
    this.timer();
    this.getAllFITBquestions()
  }


  getAllFITBquestions(){
    this.questionservice.getFITBquestions()
    .subscribe(res=>{
      this.fitbQuestionList = res;
    })
  }
  nextQuestion(currentQ:any){
    this.answer(currentQ);
    this.currentQuestion++;
    this.getProgressPercent();
    if(this.selection[this.currentQuestion] != null){
      this.op = this.selection[this.currentQuestion]
      
    }else{
      
      this.op = null;
    }
  }

  previousQuestion(currentQuestion :any){
    this.answer(currentQuestion);
    this.currentQuestion--;
    this.op = this.selection[this.currentQuestion];
    this.getProgressPercent();
  }

  answer(currentQno: any){
    this.selection[currentQno]= this.op;
    let indicator = document.querySelectorAll(".navigator div");
    indicator[currentQno].classList.add("fill");
  
    if(this.op == this.fitbQuestionList.answer){
      this.correctAnswer++;
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
      this.time++;
      if(this.seconds < 59){
        this.seconds++;
      }else{
        this.seconds = 0;
        this.minutes++;
      }
    }
      this.formated_sec = this.seconds < 10 ? `0${this.seconds}` : `${this.seconds}`;
      this.formated_min = this.minutes < 10 ? `0${this.minutes}` : `${this.minutes}`;
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
