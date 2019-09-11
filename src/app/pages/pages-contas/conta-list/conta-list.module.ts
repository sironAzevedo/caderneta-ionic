import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ContaListPage } from './conta-list.page';

const routes: Routes = [
  {
    path: '',
    component: ContaListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContaListPage],
  /* entryComponents: [
    ContaListPage
  ] */
})
export class ContaListPageModule { }
