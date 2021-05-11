import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatFormFieldModule} from '@angular/material/form-field';
import{MatInputModule} from '@angular/material/input';
import{MatCardModule} from '@angular/material/card';
import{MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  imports: [MatFormFieldModule,MatButtonModule, MatRadioModule,MatCheckboxModule,MatToolbarModule,MatInputModule,MatSelectModule,MatCardModule,MatDialogModule,MatIconModule,MatExpansionModule,MatTabsModule,MatDividerModule],
  exports: [MatFormFieldModule,MatButtonModule, MatRadioModule,MatCheckboxModule,MatToolbarModule,MatInputModule,MatSelectModule,MatCardModule,MatDialogModule,MatIconModule,MatExpansionModule,MatTabsModule,MatDividerModule]
})


export class MaterialModule{}
