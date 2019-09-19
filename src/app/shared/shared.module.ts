import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { ListSkeletonComponent } from './list-skeleton/list-skeleton.component';
import { MaterialDesignModule } from './material-design/material.module';

@NgModule({
  declarations: [
    HeaderComponent,
    ListSkeletonComponent
  ],
  exports: [
    HeaderComponent,
    ListSkeletonComponent,
    MaterialDesignModule
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    IonicModule.forRoot()
  ]
})
export class SharedModule {}
