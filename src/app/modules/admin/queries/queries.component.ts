import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Query } from 'src/app/shared/models/query';
import { QueriesService } from 'src/app/shared/services/admin/queries.service';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.scss'],
})
export class QueriesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Query>;
  public dataSource: MatTableDataSource<Query> = new MatTableDataSource<Query>(
    []
  );

  displayedColumns = ['queryStr', 'target', 'options', 'optionType', 'createdBy', 'createdDate'];

  constructor(private queriesService: QueriesService) {}

  ngAfterViewInit(): void {
    this.queriesService.getQueries().subscribe({
      next: (queries) => {
        this.dataSource = new MatTableDataSource<Query>(queries);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      },
      error: (error) => {},
    });
  }
}
