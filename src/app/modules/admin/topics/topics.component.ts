import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Topic } from 'src/app/shared/models/topic';
import { TopicsService } from 'src/app/shared/services/admin/topics.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Topic>;
  public dataSource: MatTableDataSource<Topic> = new MatTableDataSource<Topic>(
    []
  );

  displayedColumns = ['name', 'createdBy', 'createdDate'];

  constructor(private topicsService: TopicsService) {}

  ngAfterViewInit(): void {
    this.topicsService.getTopics().subscribe({
      next: (topics) => {
        this.dataSource = new MatTableDataSource<Topic>(topics);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      },
      error: (error) => {},
    });
  }
}
