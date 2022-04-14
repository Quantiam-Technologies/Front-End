import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SgxIndexComponent } from './sgx-index/sgx-index.component';
import { SgxDatabaseComponent } from './sgx-database/sgx-database.component';
import { SgxCreationDialogComponent } from './sgx-creation-dialog/sgx-creation-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: SgxIndexComponent,
    children: [
      {
        path: 'database',
        pathMatch: 'full',
        component: SgxDatabaseComponent,
        data: {name: 'SgxDatabaseComponent'}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SgxRoutingModule { }
