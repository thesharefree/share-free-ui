import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from 'src/app/material.module';
import { AdminRoutingModule } from './admin.routing';
import { TopicsService } from 'src/app/shared/services/admin/topics.service';
import { TopicsComponent } from './topics/topics.component';
import { HousesComponent } from './houses/houses.component';
import { HousesService } from 'src/app/shared/services/admin/houses.service';
import { QueriesService } from 'src/app/shared/services/admin/queries.service';
import { QueriesComponent } from './queries/queries.component';
import { QueryOptionsComponent } from './queries/query-options/query-options.component';
import { UsersComponent } from './users/users.component';
import { UsersService } from 'src/app/shared/services/admin/users.service';
import { GroupsComponent } from './groups/groups.component';
import { GroupsService } from 'src/app/shared/services/admin/groups.service';
import { MessagingService } from 'src/app/shared/services/admin/messaging.service';
import { AnnouncementsComponent } from './announcements/announcements.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    TopicsComponent,
    QueriesComponent,
    QueryOptionsComponent,
    HousesComponent,
    GroupsComponent,
    UsersComponent,
    AnnouncementsComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, MaterialModule],
  providers: [
    TopicsService,
    HousesService,
    GroupsService,
    QueriesService,
    UsersService,
    MessagingService,
  ],
})
export class AdminModule {}
