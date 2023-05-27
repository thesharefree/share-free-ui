import { AfterViewInit, Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { UsersService } from 'src/app/shared/services/admin/users.service';
import { GroupsService } from 'src/app/shared/services/admin/groups.service';
import { User } from 'src/app/shared/models/user';
import { Group } from 'src/app/shared/models/group';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  constructor(private usersService: UsersService, private groupsService: GroupsService) {}

  users: User[] = [];
  groups: Group[] = [];

  ngAfterViewInit(): void {
    this.getAllUsers();
    this.getAllGroups();
  }

  getAllUsers() {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {},
    });
  }

  getAllGroups() {
    this.groupsService.getGroups().subscribe({
      next: (groups) => {
        this.groups = groups;
      },
      error: (error) => {},
    });
  }
}
