export class User {
  _id: string = '';
  name: string = '';
  email: string = '';
  phone: string = '';
  roles: string[] = [];
  createdBy: string = '';
  createdDate: Date = new Date();
  active: boolean = false;
}
