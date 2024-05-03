import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./web/layouts/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./web/layouts/about/about.component').then(c => c.AboutComponent)
  },
  {
    path: 'newsletter',
    loadComponent: () => import('./web/layouts/subscription/subscription.component').then(c => c.SubscriptionComponent),
  },
  {
    path: 'projects',
    loadComponent: () => import('./web/layouts/projects/projects.component').then(c => c.ProjectsComponent),
  },
  {
    path: 'contact',
    loadComponent: () => import('./web/layouts/contact/contact.component').then(c => c.ContactComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./admin/layouts/login/login.component').then(c => c.LoginComponent),
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/layouts/admin/admin.component').then(c => c.AdminComponent),
    children: [
      {
        path: 'posts',
        loadComponent: () => import('./admin/layouts/posts/posts.component').then(c => c.PostsComponent),
      },
      {
        path: 'templates',
        loadComponent: () => import('./admin/layouts/templates/templates.component').then(c => c.TemplatesComponent),
      },
      {
        path: 'sales',
        loadComponent: () => import('./admin/layouts/sales/sales.component').then(c => c.SalesComponent),
      },
      {
        path: 'subscriptors',
        loadComponent: () => import('./admin/layouts/subscriptor/subscriptor.component').then(c => c.SubscriptorsComponent),
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
    loadComponent: () => import('./web/layouts/pack-template/pack-template.component').then(c => c.PackTemplateComponent),
  },
  {
    path: 'contract',
    loadComponent: () => import('./web/layouts/contract-template/contract-template.component').then(c => c.ContractTemplateComponent),
  },
  {
    path: 'questionnaire',
    loadComponent: () => import('./web/layouts/questionnaire/questionnaire.component').then(c => c.QuestionnaireComponent),
  },
  {
    path: 'budget',
    loadComponent: () => import('./web/layouts/budget-template/budget-template.component').then(c => c.BudgetTemplateComponent),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./web/layouts/checkout/checkout.component').then(c => c.CheckoutComponent),
  },
  {
    path: 'thankyou',
    loadComponent: () => import('./web/layouts/thankyou-page/thankyou-page.component').then(c => c.ThankyouPageComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
