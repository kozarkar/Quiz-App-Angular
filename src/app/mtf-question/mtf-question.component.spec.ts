import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtfQuestionComponent } from './mtf-question.component';

describe('MtfQuestionComponent', () => {
  let component: MtfQuestionComponent;
  let fixture: ComponentFixture<MtfQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MtfQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MtfQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
