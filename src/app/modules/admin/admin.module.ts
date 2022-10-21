import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from 'src/app/material.module';
import { AdminRoutingModule } from './admin.routing';
import { TopicsService } from 'src/app/shared/services/admin/topics.service';
import { TopicsComponent } from './topics/topics.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { OrganizationsService } from 'src/app/shared/services/admin/organizations.service';
import { QueriesService } from 'src/app/shared/services/admin/queries.service';
import { QueriesComponent } from './queries/queries.component';
import { QueryOptionsComponent } from './queries/query-options/query-options.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    TopicsComponent,
    QueriesComponent,
    QueryOptionsComponent,
    OrganizationsComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, MaterialModule],
  providers: [TopicsService, OrganizationsService, QueriesService],
})
export class AdminModule {}
