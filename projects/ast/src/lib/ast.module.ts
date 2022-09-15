import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material.module';

import { TblDataComponent } from './components/tables/tbl-data/tbl-data.component';
import { TblInfoComponent } from './components/tables/tbl-info/tbl-info.component';
import { CardEmptyComponent } from './components/cards/card-empty/card-empty.component';

import { InputDirective } from './directives/input/input.directive';
import { ButtonSolidDirective } from './directives/button-solid/button-solid.directive';
import { ButtonIconDirective } from './directives/button-icon/button-icon.directive';

@NgModule({
  declarations: [
    // Components
    TblDataComponent,
    TblInfoComponent,

    CardEmptyComponent,

    // Directives
    InputDirective,
    ButtonSolidDirective,
    ButtonIconDirective,
  ],
  imports: [SharedModule, MaterialModule],
  exports: [
    // Modules
    SharedModule,

    // Components
    TblDataComponent,
    TblInfoComponent,

    CardEmptyComponent,

    // Directives
    InputDirective,
    ButtonSolidDirective,
    ButtonIconDirective,
  ],
})
export class AstModule {}
