import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessagingService } from 'src/app/shared/services/admin/messaging.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
})
export class AnnouncementsComponent implements AfterViewInit {

  constructor(private messagingService: MessagingService) {}

  announceForm: FormGroup = new FormGroup({});
  isCreateAnnouncement: boolean = false;

  ngAfterViewInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.announceForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });
  }

  createDiv() {
    this.isCreateAnnouncement = !this.isCreateAnnouncement;
    this.initForm();
  }

  generalAnnouncement() {
    if (this.announceForm.valid) {
      const title = this.announceForm.controls['title'].value;
      const message = this.announceForm.controls['message'].value;
      const annouce = confirm(`Annouce: '${title}' : '${message}'?`);
      if (annouce) {
        this.messagingService.generalAnnouncement(title, message).subscribe({
          next: () => {
            this.initForm();
          },
          error: (error) => {},
        });
      }
    }
  }
}
