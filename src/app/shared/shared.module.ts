import { ListSkeletonComponent } from './list-skeleton/list-skeleton.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    HeaderComponent,
    ListSkeletonComponent
  ],
  exports: [
    HeaderComponent,
    ListSkeletonComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ]
})
export class SharedModule {}
