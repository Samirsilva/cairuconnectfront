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
  orientation: string;
  creds: CredencialDTO = {
    email: "",
    senha: ""
  };

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.sucessfullogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('PrincipalPage');
      },
        error => { });
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.sucessfullogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('PrincipalPage');
      },
        error => { });

  }
  signup() {
    this.navCtrl.push('SignupPage');
  }
  forgot() {
    this.navCtrl.push('ForgotPage');
  }
}
