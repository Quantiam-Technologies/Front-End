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
import { SlipRecipeMeasuredComponentHistoryComponent } from './slip-recipe-measured-component-history/slip-recipe-measured-component-history.component';
import { SlipAnalyticIndexComponent } from './slip-analytic-index/slip-analytic-index.component';
import { SlipCampaignUsageComponent } from './slip-campaign-usage/slip-campaign-usage.component';
import { SlipCampaignProductionComponent } from './slip-campaign-production/slip-campaign-production.component';
import { SlipCampaignManufacturingComponent } from './slip-campaign-manufacturing/slip-campaign-manufacturing.component';

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
            path: 'analytic',
            component: SlipAnalyticIndexComponent,
            data: {key: 'SlipAnalyticIndexComponent'},
            children:[   
              
                {
                  path: '',
                  pathMatch: 'full',
                  redirectTo: 'recipe/249/measured-component-history'
                },                 
                {
                  path: 'recipe/:id/measured-component-history',
                  component: SlipRecipeMeasuredComponentHistoryComponent,
                  data: {key: 'SlipRecipeMeasuredComponentHistoryComponent'}
                },
                {
                  path: 'campaign/:id/manufacturing',
                  component: SlipCampaignManufacturingComponent,
                  data: {key: 'SlipCampaignManufacturingComponent'}
                },
            ]
          },
          {
            path: ':id',
            component: SlipComponent,
            data: {key: 'SlipComponent'}
          },
            
          
        ],
      }
  ];

@NgModule({
  declarations: [SlipDatabaseComponent, SlipComponent, SlipRecipeDatabaseComponent, SlipRecipeComponent, SlipIndexComponent, SlipRecipeMeasuredComponentHistoryComponent, SlipAnalyticIndexComponent, SlipCampaignUsageComponent, SlipCampaignProductionComponent, SlipCampaignManufacturingComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HighchartsChartModule,
    SharedModule,
    MaterialDesignModule,
  ],
  exports:[
    SlipCampaignManufacturingComponent
  ]
})
export class SlipModule { }
