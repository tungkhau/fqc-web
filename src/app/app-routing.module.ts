import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'auth';
import { CustomerAPIResolver } from './customer-api-resolver';

const routes: Routes = [
  // {
  //   path: 'auth',
  //   loadChildren: () => import('auth').then((m) => m.AuthModule),
  // },
  {
    path: 'customers',
    loadChildren: () => import('customers').then((m) => m.CustomersModule),
    resolve: {
      apiUrl: CustomerAPIResolver,
    },
    data: {
      expectedPermission: 'viewCustomers',
    },
    // canLoad: [AuthGuard],
  },
  {
    path: 'products',
    loadChildren: () => import('products').then((m) => m.ProductsModule),
    resolve: {
      apiUrl: CustomerAPIResolver,
    },
    // canLoad: [AuthGuard],
  },
  {
    path: 'criteria',
    loadChildren: () => import('criteria').then((m) => m.CriteriaModule),
    resolve: {
      apiUrl: CustomerAPIResolver,
    },
    // canLoad: [AuthGuard],
  },
  {
    path: 'lots',
    loadChildren: () => import('lots').then((m) => m.LotsModule),
    resolve: {
      apiUrl: CustomerAPIResolver,
    },
    // canLoad: [AuthGuard],
  },
  {
    path: 'staffs',
    loadChildren: () => import('staffs').then((m) => m.StaffsModule),
    resolve: {
      apiUrl: CustomerAPIResolver,
    },
    // canLoad: [AuthGuard],
  },
  { path: '**', redirectTo: 'criteria' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
