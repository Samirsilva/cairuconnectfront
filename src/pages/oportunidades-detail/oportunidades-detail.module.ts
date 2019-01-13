import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OportunidadesDetailPage } from './oportunidades-detail';

@NgModule({
  declarations: [
    OportunidadesDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(OportunidadesDetailPage),
  ],
})
export class OportunidadesDetailPageModule {}
