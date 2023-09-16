import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-query-options',
  templateUrl: './query-options.component.html',
})
export class QueryOptionsComponent implements OnInit {
  @Input() options: string[] | undefined = [];
  newOption: string = '';

  constructor() {}

  ngOnInit(): void {}

  add(option: string) {
    option = option.trim();
    if (option && !this.options?.includes(option)) {
      this.options?.push(option);
    }
    this.newOption = '';
  }

  delete(option: string) {
    this.options?.splice(this.options.indexOf(option), 1);
  }
}
