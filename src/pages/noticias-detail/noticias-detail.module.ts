import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticiasDetailPage } from './noticias-detail';

@NgModule({
  declarations: [
    NoticiasDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticiasDetailPage),
  ],
})
export class NoticiasDetailPageModule {}
