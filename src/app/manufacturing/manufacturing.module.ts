import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SlipcastProfileComponent } from './slipcast-profile/slipcast-profile.component';

import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design/material-design.module';

const routes: Routes = [

	{
    path: 'slipcast/profile/:id',
    component: SlipcastProfileComponent,
    data: {key: 'SlipcastProfile'}
  },
  	{
    path: '',
    component: SlipcastProfileComponent,
    data: {key: 'SlipcastProfile'}
  }
]

@NgModule({
  declarations: [SlipcastProfileComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialDesignModule,
    SharedModule
  ]
})
export class ManufacturingModule { }
