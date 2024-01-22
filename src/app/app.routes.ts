import { Routes } from '@angular/router';
import { HomeComponent } from './web/layouts/home/home.component';
import { AboutComponent } from './web/layouts/about/about.component';
import { SubscriptionComponent } from './web/layouts/subscription/subscription.component';
import { ContactComponent } from './web/layouts/contact/contact.component';
import { LoginComponent } from './admin/layouts/login/login.component';
import { AdminComponent } from './admin/layouts/admin/admin.component';
import { PostsComponent } from './admin/layouts/posts/posts.component';
import { PackTemplateComponent } from './web/layouts/pack-template/pack-template.component';
import { ContractTemplateComponent } from './web/layouts/contract-template/contract-template.component';
import { QuestionnaireComponent } from './web/layouts/questionnaire/questionnaire.component';
import { BudgetTemplateComponent } from './web/layouts/budget-template/budget-template.component';
import { CheckoutComponent } from './web/layouts/checkout/checkout.component';
import { TemplatesComponent } from './admin/layouts/templates/templates.component';
import { SalesComponent } from './admin/layouts/sales/sales.component';
import { ThankyouPageComponent } from './web/layouts/thankyou-page/thankyou-page.component';

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
        component: PostsComponent,
      },
      {
        path: 'templates',
        component: TemplatesComponent,
      },
      {
        path: 'sales',
        component: SalesComponent,
      },
      {
        path: '',
        redirectTo: 'sales',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: 'pack',
    component: PackTemplateComponent,
  },
  {
    path: 'contract',
    component: ContractTemplateComponent,
  },
  {
    path: 'questionnaire',
    component: QuestionnaireComponent,
  },
  {
    path: 'budget',
    component: BudgetTemplateComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'thankyou',
    component: ThankyouPageComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
