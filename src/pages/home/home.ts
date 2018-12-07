import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredencialDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

creds : CredencialDTO = {
  email: "",
  senha: ""
};

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth : AuthService) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }
  
  login(){
    this.auth.authenticate(this.creds)
    .subscribe(response => {
      this.auth.sucessfullogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('EventosPage');
    },
    error => {});
    
  }
}
