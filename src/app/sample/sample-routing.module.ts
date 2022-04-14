import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleIndexComponent } from './sample-index/sample-index.component';
import { SampleDatabaseComponent } from './sample-database/sample-database.component';
import { SampleFormComponent } from './sample-form/sample-form.component';
import { SampleViewComponent } from './sample-view/sample-view.component';
import { SgxScaleAuthComponent } from './sgx-scale-auth/sgx-scale-auth.component';


const routes: Routes = [

  {
    path: '',
    component: SampleIndexComponent,
     // redirectTo: '/database',
      children: [
         {
          path: 'database',
          component: SampleDatabaseComponent,
         },

        {
          path: 'sgx-scale-auth',
          component: SgxScaleAuthComponent,

        },
        {
          path: ':id',
          component: SampleViewComponent,

        },



      ]
  },



 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleRoutingModule { }
