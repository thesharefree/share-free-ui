import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AdminService } from 'src/app/shared/services';
import { TopicsService } from 'src/app/shared/services/admin/topics.service';
import { Topic } from 'src/app/shared/models/topic';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public topics: Topic[] = [];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    private auth: AngularFireAuth,
    private adminService: AdminService,
    private topicsService: TopicsService
  ) {}

  ngOnInit(): void {
    this.topicsService.getTopics().subscribe({
      next: (topics) => {
        this.topics = topics;
      },
      error: (error) => {},
    });
  }

  async logout() {
    await this.auth.signOut();
    this.router.navigate(['/login']);
  }
}
