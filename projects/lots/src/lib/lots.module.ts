import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AstModule } from 'ast';
import { CoreModule } from 'core';
import { LotsComponent } from './lots.component';
const routes = [
  {
    path: '',
    component: LotsComponent,
  },
];
@NgModule({
  declarations: [LotsComponent],
  imports: [AstModule, RouterModule.forChild(routes), CoreModule],
  exports: [RouterModule, LotsComponent],
})
export class LotsModule {}
