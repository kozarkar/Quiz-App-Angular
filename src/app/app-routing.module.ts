import { MtfQuestionComponent } from './mtf-question/mtf-question.component';
import { FitbQuestionComponent } from './fitb-question/fitb-question.component';
import { McqQuestionComponent } from './mcq-question/mcq-question.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path:'', redirectTo:'welcome', pathMatch: 'full' },
    { path:'welcome', component:WelcomeComponent },
    { path:'mcq-question', component:McqQuestionComponent },
    { path:'fitb-question', component:FitbQuestionComponent },
    { path:'mtf-question', component:MtfQuestionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
