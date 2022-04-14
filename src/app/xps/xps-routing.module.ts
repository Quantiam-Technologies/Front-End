import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XpsIndexComponent } from './xps-index/xps-index.component';
import { XpsDatabaseComponent } from './xps-database/xps-database.component';
import { XpsViewComponent } from './xps-view/xps-view.component';


const routes: Routes = [
{
    path: '',
    component: XpsIndexComponent,
	children: [

		{
			path: 'database',
      component: XpsDatabaseComponent,
      data: { key: 'xpsDatabase' },
		},
		{
              path: 'run/:id',
              component: XpsViewComponent,
              pathMatch: 'full'
		}
	]
},

     // redirectTo: '/database',

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class XpsRoutingModule { }
