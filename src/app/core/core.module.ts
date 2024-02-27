import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { CoreRoutingModule } from './core-routing.module';

import { NgHttpLoaderModule } from 'ng-http-loader';

import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';


import { HeaderComponent } from './header/header.component';
import { CoreComponent } from './core.component';
import { PatchNotesComponent } from './patch-notes/patch-notes.component';
import { DialogSteelContainerSelectionComponent } from '../sem/sem-database/dialog-steel-container-selection/dialog-steel-container-selection.component';

import { DashboardComponent } from '../dashboard/dashboard.component';


import { CampaignModule } from '../campaign/campaign.module';
import { SlipModule } from '../slip/slip.module';
import { QualityModule } from '../quality/quality.module';
import { TokenInterceptor } from '../auth/token.interceptor';

import 'ag-grid-enterprise';  //agrid enterprise features aplpication wide




@NgModule({
    imports: [
        
        CommonModule,
        CoreRoutingModule,
        MaterialDesignModule,
        SharedModule,
        SlipModule,
        QualityModule,
        CampaignModule,
        MarkdownModule.forRoot({ loader: HttpClient }),
        HttpClientModule,
        NgHttpLoaderModule.forRoot(),
    ],
    exports: [
        RouterModule,
        HeaderComponent,
    ],
    declarations: [
        HeaderComponent,
        CoreComponent,
        PatchNotesComponent,
        DashboardComponent,
        
        
        DialogSteelContainerSelectionComponent
    ],
    bootstrap: [CoreComponent],
    providers: [{
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },]
})
export class CoreModule { }
