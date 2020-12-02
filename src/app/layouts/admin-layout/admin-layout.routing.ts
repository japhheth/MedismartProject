import { Routes } from '@angular/router';
import {ViewUsersComponent} from "../../pages/view-users/view-users.component";
import {AddUsersComponent} from '../../pages/add-users/add-users.component';




export const AdminLayoutRoutes: Routes = [
  { path: 'add-users', component: AddUsersComponent},
  { path: 'view-users', component: ViewUsersComponent}

];
