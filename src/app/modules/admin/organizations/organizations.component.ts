import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public dataSource: MatTableDataSource<Organization> =
    new MatTableDataSource<Organization>([]);

  displayedColumns = [
    'name',
    'description',
    'owner',
    'createdBy',
    'createdDate',
    'actions',
  ];
  editOrg: Organization = new Organization();
  editForm: FormGroup = new FormGroup({});
  createOrg: Organization = new Organization();
  createForm: FormGroup = new FormGroup({});
  createOrgDiv: boolean = false;

  constructor(private organizationsService: OrganizationsService) {}

  getAllOrganizations() {
    this.organizationsService.getOrganizations().subscribe({
      next: (organizations) => {
        this.dataSource = new MatTableDataSource<Organization>(organizations);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      },
      error: (error) => {},
    });
    this.createOrg = new Organization();
    this.createOrgDiv = false;
  }

  ngAfterViewInit(): void {
    this.getAllOrganizations();
  }

  toggle(org: Organization) {
    this.organizationsService.toggleOrganization(org._id).subscribe({
      next: () => {
        org.active = !org.active;
      },
      error: (error) => {},
    });
  }

  createDiv() {
    this.createForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      owner: new FormControl('', [Validators.required, Validators.email]),
      description: new FormControl('', [Validators.required]),
    });
    this.createOrgDiv = true;
  }

  create() {
    if (this.createForm.valid) {
      this.organizationsService
        .createOrganization(this.createForm.getRawValue())
        .subscribe({
          next: () => {
            this.getAllOrganizations();
          },
          error: (error) => {},
        });
    }
  }

  editDiv(organization: Organization) {
    this.editOrg = organization;
    this.editForm = new FormGroup({
      _id: new FormControl(this.editOrg._id, [Validators.required]),
      name: new FormControl(this.editOrg.name, [Validators.required]),
      owner: new FormControl(this.editOrg.owner, [
        Validators.required,
        Validators.email,
      ]),
      description: new FormControl(this.editOrg.description, [
        Validators.required,
      ]),
    });
  }

  update() {
    if (this.editForm.valid) {
      this.organizationsService
        .updateOrganization(this.editForm.getRawValue())
        .subscribe({
          next: () => {
            this.getAllOrganizations();
          },
          error: (error) => {},
        });
    }
  }
}
