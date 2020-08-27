import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  questions: Array<any>;
  currentQuestion: number;
  score: number;

  styles: Object = {
    1: 'btn-outline-secondary',
    2: 'btn-outline-secondary',
    3: 'btn-outline-secondary',
    4: 'btn-outline-secondary',
  };
  next: string = 'Next';

  constructor(
    private questionsService: QuestionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questions = this.questionsService.getQuestions();
    if (this.questions == null || this.questions == undefined) {
      this.questionsService.readQuestions().subscribe((data) => {
        if (data) {
          this.questionsService.setQuestions(data.questions);
          this.questionsService.setCurrentQuestion(0);
          this.questionsService.setScore(0);
          this.questions = data.questions;
          this.currentQuestion = 0;
          this.score = 0;
        }
      });
    } else {
      this.currentQuestion = this.questionsService.getCurrentQuestion();
      this.score = this.questionsService.getScore();
    }
  }

  nextQuestion() {
    this.styles = {
      1: 'btn-outline-secondary',
      2: 'btn-outline-secondary',
      3: 'btn-outline-secondary',
      4: 'btn-outline-secondary',
    };
    this.currentQuestion += 1;
    this.questionsService.setCurrentQuestion(this.currentQuestion);
  }

  onButtonClick(n) {
    if (this.questions[this.currentQuestion].answer === n) {
      this.score += 1;
      this.questionsService.setScore(this.score);
      this.styles[n] = 'btn-success';
    } else {
      this.styles[n] = 'btn-danger';
      this.styles[this.questions[this.currentQuestion].answer] = 'btn-success';
    }
  }

  onClick() {
    if (this.currentQuestion + 1 == this.questions.length) {
      // this.questionsService.removeQuestions();
      this.router.navigate(['/leaderboard']);
    } else {
      if (this.currentQuestion + 2 == this.questions.length) {
        this.next = 'Submit';
      }
      this.nextQuestion();
    }
  }
}
