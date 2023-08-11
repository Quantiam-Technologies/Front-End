import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FurnaceRunComponent } from './furnace-run/furnace-run.component';
import { FurnaceDatabaseComponent } from './furnace-database/furnace-database.component';
import { FurnaceIndexComponent } from './furnace-index/furnace-index.component';

import { FurnaceRunDatabaseComponent } from './furnace-run-database/furnace-run-database.component';


const routes: Routes = [
  {
    path: '',
    component: FurnaceIndexComponent,
    children: [

      {
        path: 'run/database',
        component: FurnaceDatabaseComponent,
        data: {key: 'FurnaceRunDatabaseComponent'}
      },
      {
        path: 'run/:id',
        component: FurnaceRunComponent,
        data: {key: 'FurnaceRunView'}
      },
    ],

  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FurnaceRoutingModule { }
