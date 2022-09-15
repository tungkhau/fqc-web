import { NgModule } from '@angular/core';
import { AstModule } from 'ast';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [AuthRoutingModule, AstModule],
  exports: [AuthComponent],
})
export class AuthModule {}
