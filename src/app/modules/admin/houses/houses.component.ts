import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { House } from 'src/app/shared/models/house';
import { HousesService } from 'src/app/shared/services/admin/houses.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss'],
})
export class HousesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<House>;
  public dataSource: MatTableDataSource<House> =
    new MatTableDataSource<House>([]);

  displayedColumns = [
    'name',
    'description',
    'owner',
    'createdDate',
    'actions',
  ];
  editHouse: House = new House();
  editForm: FormGroup = new FormGroup({});
  createHouse: House = new House();
  createForm: FormGroup = new FormGroup({});
  createHouseDiv: boolean = false;

  constructor(private housesService: HousesService) {}

  getAllHouses() {
    this.housesService.getHouses().subscribe({
      next: (houses) => {
        this.dataSource = new MatTableDataSource<House>(houses);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      },
      error: (error) => {},
    });
    this.createHouse = new House();
    this.createHouseDiv = false;
  }

  ngAfterViewInit(): void {
    this.getAllHouses();
  }

  toggle(house: House) {
    this.housesService.toggleHouse(house._id).subscribe({
      next: () => {
        house.active = !house.active;
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
    this.createHouseDiv = true;
  }

  create() {
    if (this.createForm.valid) {
      this.housesService
        .createHouse(this.createForm.getRawValue())
        .subscribe({
          next: () => {
            this.getAllHouses();
          },
          error: (error) => {},
        });
    }
  }

  editDiv(house: House) {
    this.editHouse = house;
    this.editForm = new FormGroup({
      _id: new FormControl(this.editHouse._id, [Validators.required]),
      name: new FormControl(this.editHouse.name, [Validators.required]),
      owner: new FormControl(this.editHouse.owner, [
        Validators.required,
        Validators.email,
      ]),
      description: new FormControl(this.editHouse.description, [
        Validators.required,
      ]),
    });
  }

  update() {
    if (this.editForm.valid) {
      this.housesService
        .updateHouse(this.editForm.getRawValue())
        .subscribe({
          next: () => {
            this.getAllHouses();
          },
          error: (error) => {},
        });
    }
  }
}
