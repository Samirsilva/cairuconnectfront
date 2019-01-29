import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { OportunidadeDTO } from '../../models/oportunidade.dto';
import { OportunidadeService } from '../../services/domain/oportunidade.service';

@IonicPage()
@Component({
  selector: 'page-oportunidades',
  templateUrl: 'oportunidades.html',
})
export class OportunidadesPage {

  bucketUrl : string = API_CONFIG.bucketBaseUrl
  items  : OportunidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public oportunidadeService : OportunidadeService,
    public loadingControl : LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let loader = this.presentloading();
    this.oportunidadeService.findAll().subscribe(response => {this.items = response;loader.dismiss()},
    error => {loader.dismiss()});
  }
  
  showDetail(oportunidade_id : string){
    this.navCtrl.push('OportunidadesDetailPage', {oportunidade_id : oportunidade_id});
  }
  presentloading(){
    let loader = this.loadingControl.create({
      content : "Por favor, espere...",
    });
    loader.present();
    return loader;
  }
  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
}
