import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Group } from 'src/app/shared/models/group';
import { GroupsService } from 'src/app/shared/services/admin/groups.service';
import { MessagingService } from 'src/app/shared/services/admin/messaging.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Group>;
  public dataSource: MatTableDataSource<Group> = new MatTableDataSource<Group>(
    []
  );

  displayedColumns = ['name', 'description', 'owner', 'createdDate', 'actions'];

  constructor(
    private groupsService: GroupsService,
    private messagingService: MessagingService
  ) {}

  getAllGroups() {
    this.groupsService.getGroups().subscribe({
      next: (groups) => {
        this.dataSource = new MatTableDataSource<Group>(groups);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      },
      error: (error) => {},
    });
  }

  ngAfterViewInit(): void {
    this.getAllGroups();
  }

  toggle(group: Group) {
    this.groupsService.toggleGroup(group._id).subscribe({
      next: () => {
        group.active = !group.active;
      },
      error: (error) => {},
    });
  }

  delete(group: Group) {
    const remove = confirm(`Delete group: '${group.name}'?`);
    if (remove) {
      this.groupsService.deleteGroup(group._id).subscribe({
        next: () => {
          group.deleted = !group.deleted;
        },
        error: (error) => {},
      });
    }
  }

  notifyJoinGroup(group: Group) {
    const annouce = confirm(`Annouce group: '${group.name}'?`);
    if (annouce) {
      this.messagingService.notifyJoinGroup(group._id).subscribe({
        next: () => {},
        error: (error) => {},
      });
    }
  }
}
