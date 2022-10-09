import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SfUser {
  _id: string = '';
  name: string = '';
  email: string = '';
  phone: string = '';
  createdBy: string = '';
  createdDate: number = 0;
  roles: string[] = [];
  active: boolean = false;

  deepCopy(user: SfUser) {
    this._id = user._id;
    this.createdBy = user.createdBy;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.createdBy = user.createdBy;
    this.roles = user.roles;
    this.active = user.active;
  }
}
