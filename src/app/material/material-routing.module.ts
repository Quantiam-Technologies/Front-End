import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialCreationDialogComponent } from './material-creation-dialog/material-creation-dialog.component';
import { MaterialIndexComponent } from './material-index/material-index.component';
import { MaterialDatabaseComponent } from './material-database/material-database.component';
import { MaterialViewComponent } from './material-view/material-view.component';
import { MaterialContainerDatabaseComponent } from './material-container-database/material-container-database.component';
import { MaterialContainerViewComponent } from './material-container-view/material-container-view.component';
import { MaterialComponent } from './material.component';
import { MaterialContainerViewAnalysisComponent } from './material-container-view-analysis/material-container-view-analysis.component';
import { MaterialSettingsComponent } from './material-settings/material-settings.component';

import { MaterialContainerLogComponent } from './material-container-log/material-container-log.component';

const routes: Routes = [
  {
    path: '',
    component: MaterialIndexComponent,
    children: [

      {
        path: 'container/database',
        pathMatch: 'full',
        component: MaterialContainerDatabaseComponent,
        data: {key: 'MaterialContainerDatabase'}
      },
      {
        path: 'container/:id',
        component: MaterialContainerViewComponent,        
        data: {key: 'MaterialContainerView'}
      },
      {
        path:'container/:id/analysis',
        component: MaterialContainerViewAnalysisComponent,
        data: {key: 'MaterialContainerViewAnalysis'}
      }, 
      {
        path:'container/:id/log',
        component: MaterialContainerLogComponent,
        data: {key: 'MaterialContainerLogt'}
      },
      {
        path: 'database',
        component: MaterialDatabaseComponent,
      },
      {
        path: 'create',
        component: MaterialCreationDialogComponent

      },
      {
        // name: 'material_view',
        path: 'settings',
        component: MaterialSettingsComponent,
        pathMatch: 'full'
      },
      {
        // name: 'material_view',
        path: ':id',
        component: MaterialViewComponent,
        pathMatch: 'full'
      },
      




    ]
  }, ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }
