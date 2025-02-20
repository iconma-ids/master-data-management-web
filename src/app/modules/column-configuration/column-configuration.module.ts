import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColumnConfigurationRoutingModule } from './column-configuration-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {  ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColumnConfigurationDeleteDialogComponent } from './column-configuration-delete-dialog.component';
 import { ListComponent } from './list/list.component';
 import { CreateComponent } from './create/create.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({ declarations: [
        ListComponent,
        CreateComponent,
        //ColumnConfigurationDeleteDialogComponent,
    ], imports: [CommonModule,
        ColumnConfigurationRoutingModule,
        MatTableModule, MatListModule, MatButtonModule, MatSelectModule, NgbModule,
        MatCheckboxModule, MatSortModule, MatInputModule, ReactiveFormsModule,
        AngularEditorModule] })
export class ColumnConfigurationModule { }
