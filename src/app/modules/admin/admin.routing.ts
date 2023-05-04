import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HousesComponent } from './houses/houses.component';
import { QueriesComponent } from './queries/queries.component';
import { TopicsComponent } from './topics/topics.component';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { AnnouncementsComponent } from './announcements/announcements.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'topics', component: TopicsComponent },
      { path: 'houses', component: HousesComponent },
      { path: 'groups', component: GroupsComponent },
      { path: 'queries', component: QueriesComponent },
      { path: 'users', component: UsersComponent },
      { path: 'announcements', component: AnnouncementsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
