import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Organization } from 'src/app/shared/models/organization';
import { OrganizationsService } from 'src/app/shared/services/admin/organizations.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
})
export class OrganizationsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Organization>;
  public dataSource: MatTableDataSource<Organization> = new MatTableDataSource<Organization>(
    []
  );

  displayedColumns = ['name', 'createdBy', 'createdDate'];

  constructor(private organizationsService: OrganizationsService) {}

  ngAfterViewInit(): void {
    this.organizationsService.getOrganizations().subscribe({
      next: (organizations) => {
        this.dataSource = new MatTableDataSource<Organization>(organizations);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      },
      error: (error) => {},
    });
  }
}
