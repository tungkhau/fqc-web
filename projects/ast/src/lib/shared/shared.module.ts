import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DndModule } from 'ngx-drag-drop';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],

  exports: [CommonModule, DndModule, ReactiveFormsModule, RouterModule],
})
export class SharedModule {}
