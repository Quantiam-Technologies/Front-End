import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeartileDatabaseComponent } from './weartile-database/weartile-database.component';
import { WeartileViewComponent } from './weartile-view/weartile-view.component';
import { WeartileIndexComponent } from './weartile-index/weartile-index.component';


import { Routes, RouterModule  } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { WeartileTypeComponent } from './weartile-type/weartile-type.component';

const routes: Routes = [
  {
    path: '',
    component: WeartileIndexComponent,
    children: [

      {
        path: 'database',
        component: WeartileDatabaseComponent,
        data: {key: 'WeartileDatabase'}
      },
      {
        path: ':id',
        component: WeartileViewComponent,
        data: {key: 'WeartileView'}
      },

    ]
  }
]



@NgModule({
  declarations: [
    WeartileDatabaseComponent,
    WeartileViewComponent,
    WeartileIndexComponent,
    WeartileTypeComponent
  ],
  imports: [
    CommonModule,    
    SharedModule,
    MaterialDesignModule,
    RouterModule.forChild(routes)
  ]
})
export class WeartileModule { }
