import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Silt2023Component } from './silt2023/silt2023.component';
import { ThroughputComponent } from './shared/throughput/throughput.component';
import { StatusComponent } from './shared/status/status.component';
import { HoldsComponent } from './shared/holds/holds.component';
import { TotalProgressComponent } from './shared/total-progress/total-progress.component';

import { ReworksComponent } from './shared/reworks/reworks.component';

const routes: Routes = [
	{
    path: '',
    redirectTo: 'silt2023',
    pathMatch:'full'
  },
  
  {
    path: 'silt2023',
    data: { key: 'silt2023'},
    component: Silt2023Component,
  },
  {
    path: 'silt2023/total-progress',
    component: TotalProgressComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
