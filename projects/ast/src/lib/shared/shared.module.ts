import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DndModule } from 'ngx-drag-drop';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [],

  exports: [
    CommonModule,
    DndModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FormsModule,
  ],
})
export class SharedModule {}
