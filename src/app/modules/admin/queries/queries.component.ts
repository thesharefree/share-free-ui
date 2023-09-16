import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Query } from 'src/app/shared/models/query';
import { QueriesService } from 'src/app/shared/services/admin/queries.service';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
})
export class QueriesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Query>;
  public dataSource: MatTableDataSource<Query> = new MatTableDataSource<Query>(
    []
  );
  displayedColumns = [
    'queryStr',
    'target',
    'options',
    'optionType',
    'actions',
  ];
  editQuery: Query = new Query();
  editForm: FormGroup = new FormGroup({});

  isCreateQuery: boolean = false;
  createQuery: Query = new Query();
  createForm: FormGroup = new FormGroup({});

  constructor(private queriesService: QueriesService) {}

  ngAfterViewInit(): void {
    this.getAllQueries();
  }

  getAllQueries() {
    this.queriesService.getQueries().subscribe({
      next: (queries) => {
        this.dataSource = new MatTableDataSource<Query>(queries);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      },
      error: (error) => {},
    });
    this.editQuery = new Query();
    this.isCreateQuery = false;
    this.createQuery = new Query();
  }

  toggle(query: Query) {
    this.queriesService.toggleQuery(query._id).subscribe({
      next: () => {
        query.active = !query.active;
      },
      error: (error) => {},
    });
  }

  delete(query: Query) {
    if (confirm(`Delete ${query.queryStr}`)) {
      this.queriesService.deleteQuery(query._id).subscribe({
        next: () => {
          this.getAllQueries();
        },
        error: (error) => {},
      });
    }
  }

  editDiv(query: Query) {
    this.editQuery = query;
    this.editForm = new FormGroup({
      queryStr: new FormControl(this.editQuery.queryStr, [Validators.required]),
      options: new FormControl(this.editQuery.options),
    });
  }

  update() {
    if (this.editForm.valid) {
      this.editQuery.queryStr = this.editForm.controls['queryStr'].value;
      this.editQuery.options = this.editForm.controls['options'].value;
      console.log(JSON.stringify(this.editQuery));
      this.queriesService.updateQuery(this.editQuery).subscribe({
        next: () => {
          this.getAllQueries();
        },
        error: (error) => {},
      });
    }
  }

  createDiv() {
    this.isCreateQuery = !this.isCreateQuery;
    this.createQuery = new Query();
    this.createForm = new FormGroup({
      queryStr: new FormControl('', [Validators.required]),
      options: new FormControl([]),
    });
  }

  create() {
    console.log(
      JSON.stringify(this.createForm.getRawValue()),
      this.createForm.valid,
      this.createForm.controls['queryStr'].valid,
      this.createForm.controls['options'].valid
    );
    if (this.createForm.valid) {
      this.createQuery.queryStr = this.createForm.controls['queryStr'].value;
      this.createQuery.options = this.createForm.controls['options'].value;
      console.log(JSON.stringify(this.createQuery));
      this.queriesService.createQuery(this.createQuery).subscribe({
        next: () => {
          this.getAllQueries();
        },
        error: (error) => {},
      });
    }
  }
}
