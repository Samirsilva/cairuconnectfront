import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public noticiaService : NoticiaService) {
  }
 
  ionViewDidLoad() {
    this.noticiaService.findAll().subscribe(response => {
      this.items = response;
    },
    error => {});
  }
  
  showDetail(noticia_id : string){
    this.navCtrl.push('NoticiasDetailPage', {noticia_id : noticia_id});
  }
}
