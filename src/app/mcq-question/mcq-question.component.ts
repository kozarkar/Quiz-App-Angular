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

  stopTimer : any;
  time = 0;
  dt = new Date(new Date().setTime(0));
  ctime = this.dt.getTime();
  seconds = Math.floor((this.ctime % (1000*60))/1000);
  mintes = Math.floor((this.ctime % (1000*60*60))/(1000*60));
  formated_sec : any = "00";
  formated_min : any = "00";

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
      if(this.selection[this.currentQuestion] != null){
        this.op = this.selection[this.currentQuestion]

      }else{
        this.op = null;
      }
    }

    previousQuestion(){
      this.currentQuestion--;
      this.op = this.selection[this.currentQuestion];
    }

    answer(currentQno: number, i:any){
      this.selection[currentQno-1]= i;       
    }

    postAnswer(id:any, data:any){
      this.questionservice.postMCQanswers(id,data)
      .subscribe((res=>{       
      }))     
    }
    
    timer(){
      this.stopTimer = setInterval(()=>{
        this.time++;
        if(this.seconds < 59){
          this.seconds++;
        }else{
          this.seconds = 0;
          this.mintes++;
        }
        this.formated_sec = this.seconds < 10 ? `0${this.seconds}` : `${this.seconds}`;
        this.formated_min = this.mintes < 10 ? `0${this.mintes}` : `${this.mintes}`;
      },1000)
    }

    startCounter(){
      this.interval$ = interval(1000)
      .subscribe(val=>{
        this.counter--;
        if(this.counter===0){
          this.currentQuestion++;
          this.counter=60;
        }
      })
    }
    stopCounter(){

    }
    resetCounter(){

    }
}
