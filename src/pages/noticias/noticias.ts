import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { NoticiaDTO } from '../../models/noticia.dto';
import { API_CONFIG } from '../../config/api.config';
import { NoticiaService } from '../../services/domain/noticia.service';

@IonicPage()
@Component({
  selector: 'page-noticias',
  templateUrl: 'noticias.html',
})
export class NoticiasPage {
 
  bucketUrl : string = API_CONFIG.bucketBaseUrl
  items  : NoticiaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public noticiaService : NoticiaService,
    public loadingControl : LoadingController) {
  }
 
  ionViewDidLoad() {
    this.loadData();
  }
  loadData(){
    let loader = this.presentloading();
    this.noticiaService.findAll().subscribe(response => {this.items = response;loader.dismiss()},
    error => {loader.dismiss()});
  }
  
  showDetail(noticia_id : string){
    this.navCtrl.push('NoticiasDetailPage', {noticia_id : noticia_id});
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
