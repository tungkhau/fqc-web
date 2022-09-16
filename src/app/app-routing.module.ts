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
    path: 'employees',
    loadChildren: () => import('employees').then((m) => m.EmployeesModule),
    resolve: {
      apiUrl: CustomerAPIResolver,
    },
    // canLoad: [AuthGuard],
  },
  { path: '**', redirectTo: 'employees' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
