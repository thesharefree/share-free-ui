import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  contact: any;

  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit() {
    this.contact = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };
  }

  contactUs() {}

  public scrollToElement(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
