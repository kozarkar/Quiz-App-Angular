import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitbQuestionComponent } from './fitb-question.component';

describe('FitbQuestionComponent', () => {
  let component: FitbQuestionComponent;
  let fixture: ComponentFixture<FitbQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FitbQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FitbQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
