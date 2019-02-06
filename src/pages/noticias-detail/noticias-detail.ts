import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoticiaDTO } from '../../models/noticia.dto';
import { NoticiaService } from '../../services/domain/noticia.service';

@IonicPage()
@Component({
  selector: 'page-noticias-detail',
  templateUrl: 'noticias-detail.html',
})
export class NoticiasDetailPage {

  item : NoticiaDTO

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public noticiaService : NoticiaService) {
  }
 
  ionViewDidLoad() {
    let noticia_id = this.navParams.get('noticia_id');
    
    this.noticiaService.findById(noticia_id).subscribe(response => {
      this.item = response;
      //this.getImageIfExists()
    },
    error => {});
  }
  getImageIfExists(){
    this.noticiaService.getimageFromBucket(this.item.id).subscribe(response => {
      this.item.imgLink = `${this.item.imgLink}/notice${this.item.id}.jpg`;
    },
    
    error =>{});
  }
}
