import { Routes } from '@angular/router';
import { HomeComponent } from './web/layouts/home/home.component';
import { AboutComponent } from './web/layouts/about/about.component';
import { SubscriptionComponent } from './web/layouts/subscription/subscription.component';
import { ContactComponent } from './web/layouts/contact/contact.component';
import { LoginComponent } from './admin/layouts/login/login.component';
import { AdminComponent } from './admin/layouts/admin/admin.component';
import { PostsComponent } from './admin/layouts/posts/posts.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'newsletter',
    component: SubscriptionComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'posts',
        component: PostsComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];
