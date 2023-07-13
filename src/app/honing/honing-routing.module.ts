import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HoningComponent } from './honing.component'

const routes: Routes = [	{
  path: '',
  redirectTo: 'database',
  pathMatch:'full'
},
 
{
  path: 'database',
  component: HoningComponent,
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HoningRoutingModule { }
