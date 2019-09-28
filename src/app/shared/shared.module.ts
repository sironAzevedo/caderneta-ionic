import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { ListSkeletonComponent } from './list-skeleton/list-skeleton.component';
import { MaterialDesignModule } from './material-design/material.module';
import { DateFormatPipe } from './pipes/dateFormatPipe';

@NgModule({
  declarations: [
    HeaderComponent,
    ListSkeletonComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    IonicModule.forRoot()
  ],
  exports: [
    HeaderComponent,
    ListSkeletonComponent,
    MaterialDesignModule
  ],
  providers: [DateFormatPipe]
})
export class SharedModule {}
