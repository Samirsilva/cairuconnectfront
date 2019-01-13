import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoticiaDTO } from '../../models/noticia.dto';

/**
 * Generated class for the NoticiasDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-noticias-detail',
  templateUrl: 'noticias-detail.html',
})
export class NoticiasDetailPage {

  item : NoticiaDTO

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.item = {
      id : "1",
      informe : "Teste",
      fonte : "google.com"
    }
  }
}
