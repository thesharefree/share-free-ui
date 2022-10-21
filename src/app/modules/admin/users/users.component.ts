import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/shared/models/user';
import { UsersService } from 'src/app/shared/services/admin/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User>;
  public dataSource: MatTableDataSource<User> = new MatTableDataSource<User>(
    []
  );

  displayedColumns = ['name', 'email', 'phone', 'roles', 'createdBy', 'createdDate', 'actions'];
  editUser: User = new User();
  editForm: FormGroup = new FormGroup({});
  createUser: User = new User();
  createForm: FormGroup = new FormGroup({});
  createUserDiv: boolean = false;

  constructor(private usersService: UsersService) {}

  getAllUsers() {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.dataSource = new MatTableDataSource<User>(users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      },
      error: (error) => {},
    });
    this.createUser = new User();
    this.createUserDiv = false;
  }

  ngAfterViewInit(): void {
    this.getAllUsers();
  }

  toggle(org: User) {
    this.usersService.toggleUser(org._id).subscribe({
      next: () => {
        org.active = !org.active;
      },
      error: (error) => {},
    });
  }

  createDiv() {
    this.createForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(8)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    });
    this.createUserDiv = true;
  }

  create() {
    if (this.createForm.valid) {
      this.usersService.createAdmin(this.createForm.getRawValue()).subscribe({
        next: () => {
          this.getAllUsers();
        },
        error: (error) => {},
      });
    }
  }
}
