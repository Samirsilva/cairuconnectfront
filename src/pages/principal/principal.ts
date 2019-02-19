import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalPage');
  }

  perfil(){
    this.navCtrl.push('ProfilePage');
  }
  noticias(){
    this.navCtrl.push('NoticiasPage');
  }
  oportunidades(){
    this.navCtrl.push('OportunidadesPage');
  }
  eventos(){
    this.navCtrl.push('EventosPage');
  }
}
