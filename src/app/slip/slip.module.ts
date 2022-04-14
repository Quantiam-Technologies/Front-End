import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design/material-design.module';

import { Routes, RouterModule } from '@angular/router';
import { SlipDatabaseComponent } from './slip-database/slip-database.component';
import { SlipComponent } from './slip/slip.component';
import { SlipRecipeDatabaseComponent } from './slip-recipe-database/slip-recipe-database.component';
import { SlipRecipeComponent } from './slip-recipe/slip-recipe.component';
import { SlipIndexComponent } from './slip-index/slip-index.component';

const routes: Routes = [ 
   {
      path: '',
        component: SlipIndexComponent,
        children: [

          {
            path: 'database',
            component: SlipDatabaseComponent,
            data: {key: 'SlipDatabaseComponent'}
          },
          {
            path: 'run/:id',
            component: SlipComponent,
            data: {key: 'SlipComponent'}
          }
        ],
      }
  ];

@NgModule({
  declarations: [SlipDatabaseComponent, SlipComponent, SlipRecipeDatabaseComponent, SlipRecipeComponent, SlipIndexComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HighchartsChartModule,
    SharedModule,
    MaterialDesignModule,
  ]
})
export class SlipModule { }
