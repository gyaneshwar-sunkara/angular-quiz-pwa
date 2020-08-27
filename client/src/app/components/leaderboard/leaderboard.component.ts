import { Component, OnInit } from '@angular/core';

import { SubmissionService } from '../../services/submission.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  submissions: Array<any>;
  currentSubmission: string;
  currentScore: number;

  constructor(private submissionService: SubmissionService) {}

  ngOnInit(): void {
    this.currentSubmission = this.submissionService.getCurrentSubmission();
    this.currentScore = this.submissionService.getCurrentScore();
    this.submissionService.readSubmissions().subscribe((data) => {
      this.submissions = data.submissions;
      const d = new Date(this.submissions[0].timestamp);
      console.log(d);
    });
  }
}
