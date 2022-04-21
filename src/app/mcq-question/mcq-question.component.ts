import { QuestionService } from './../service/question.service';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-mcq-question',
  templateUrl: './mcq-question.component.html',
  styleUrls: ['./mcq-question.component.scss']
})
export class McqQuestionComponent implements OnInit {

  public mcqQuestionList : any = [];
  public currentQuestion : number = 0;
  public marks : number =0;
  counter=60;
  correctAnswer: number = 0;
  inCorrectAnswer: number =0;
  
  interval$ : any;
  selection: any = [];
  op: any ;
  progress: string ="0";
  stopTimer : any;
  time = 0;
  dt = new Date(new Date().setTime(0));
  ctime = this.dt.getTime();
  seconds = Math.floor((this.ctime % (1000*60))/1000);
  mintes = Math.floor((this.ctime % (1000*60*60))/(1000*60));
  formated_sec : any = "00";
  formated_min : any = "00";
  quizShow: boolean = true;
  resultShow: boolean = false;

  constructor(private questionservice: QuestionService) { }

  ngOnInit(): void {
    this.timer();
    this.getAllMCQquestions();
  }

    getAllMCQquestions(){
      this.questionservice.getMCQquestions()
      .subscribe(res=>{
        this.mcqQuestionList = res;
      })
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
    
      if(option.correct){
        this.correctAnswer++;
        this.getProgressPercent();

        // let options = document.querySelectorAll(".answers-indicator div");
        // options[this.currentQuestion].classList.add("correct");

      }else{
        this.inCorrectAnswer++;
        console.log("incorrect");
        this.getProgressPercent();

        // let options = document.querySelectorAll(".answers-indicator div");
        // options[this.currentQuestion].classList.add("incorrect");


      }
      let indicator = document.querySelectorAll(".answers-indicator div");
      indicator[currentQno].classList.add("fill");
    }

    timer(){
      this.stopTimer = setInterval(()=>{
        if(this.quizShow == true){
        this.time++;
        if(this.seconds < 59){
          this.seconds++;
        }else{
          this.seconds = 0;
          this.mintes++;
        }
      }
        this.formated_sec = this.seconds < 10 ? `0${this.seconds}` : `${this.seconds}`;
        this.formated_min = this.mintes < 10 ? `0${this.mintes}` : `${this.mintes}`;
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
}

