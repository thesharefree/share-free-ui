export class Query {
  _id: string = '';
  queryStr: string = '';
  target: string[] = [];
  options?: string[] = [];
  optionType?: string = '';
  createdBy: string = '';
  createdDate: Date = new Date();
  active: boolean = false;
}
