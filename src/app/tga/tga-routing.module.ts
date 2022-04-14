import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TgaDatabaseComponent } from './tga-database/tga-database.component';
import { TgaIndexComponent } from './tga-index/tga-index.component';
import { TgaViewComponent } from './tga-view/tga-view.component';

import { TgaPeakSelectionToolComponent } from './tga-peak-selection-tool/tga-peak-selection-tool.component';


const routes: Routes = [

  {
    path: '',
    component: TgaIndexComponent,
    children: [
       {
            path: 'database',
            data: { key: 'tgaDatabase' },
            component: TgaDatabaseComponent,
       },
       {
        path: 'peak-tool',
        data: { key: 'tgaPeakTool'},
        component: TgaPeakSelectionToolComponent,
       },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TgaRoutingModule { }
