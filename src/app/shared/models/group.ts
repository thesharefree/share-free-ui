export class Group {
  _id: string = '';
  name: string = '';
  owner: string = '';
  description: string = '';
  createdBy: string = '';
  createdDate: Date = new Date();
  active: boolean = false;
  deleted: boolean = false;
}
