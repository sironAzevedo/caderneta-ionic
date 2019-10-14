import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HideFabDirective } from './directives/hide-fab.directive';
import { HeaderComponent } from './header/header.component';
import { ListSkeletonComponent } from './list-skeleton/list-skeleton.component';
import { MaterialDesignModule } from './material-design/material.module';
import { DateFormatPipe } from './pipes/dateFormatPipe';
import { MesLengthPipe } from './pipes/mesLengthPipe';

@NgModule({
  declarations: [
    HeaderComponent,
    ListSkeletonComponent,
    HideFabDirective,
    MesLengthPipe
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    IonicModule.forRoot()
  ],
  exports: [
    HeaderComponent,
    ListSkeletonComponent,
    MaterialDesignModule,
    MesLengthPipe
  ],
  providers: [DateFormatPipe]
})
export class SharedModule {}
