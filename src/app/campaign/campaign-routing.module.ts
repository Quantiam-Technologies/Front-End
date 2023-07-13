import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Silt2023Component } from './silt2023/silt2023.component';

const routes: Routes = [
	{
    path: '',
    redirectTo: 'silt2023',
    pathMatch:'full'
  },
  
  {
    path: 'silt2023',
    component: Silt2023Component,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
