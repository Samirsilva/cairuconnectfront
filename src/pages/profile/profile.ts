import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { UsuarioDTO } from '../../models/usuario.dto';
import { UsuarioService } from '../../services/domain/usuario.service';
import { API_CONFIG } from '../../config/api.config';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  usuario: UsuarioDTO;
  picture: String;
  profileImage;
  cameraOn: boolean = false;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public usuarioService: UsuarioService,
    public camera: Camera,
    public sanitizer: DomSanitizer,
    public alertCtrl: AlertController,
    public loadingControl: LoadingController) {

    this.profileImage = 'assets/imgs/avatar-blank.png';
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.usuarioService.findByEmail(localUser.email).subscribe(response => {
        this.usuario = response as UsuarioDTO;
        this.getImageIfExists();
      },

        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        });

    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }
  getImageIfExists() {
    this.usuarioService.getimageFromBucket(this.usuario.id)
      .subscribe(response => {
        this.usuario.imageURL = `${API_CONFIG.bucketBaseUrl}/cp${this.usuario.id}.jpg`;
        this.blobToDataURL(response).then(dataUrl => {
          let str: string = dataUrl as string;
          this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
        });
      },

        error => {
          this.profileImage = 'assets/imgs/avatar-blank.png';
        });
  }

  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => fulfill(reader.result);
      reader.readAsDataURL(blob);
    })
  }

  getCameraPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }

  getGalleryPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }

  sendPicture() {
    let loader = this.presentloading();
    this.usuarioService.uploadPicture(this.picture)
      .subscribe(response => {
        loader.dismiss();
        this.picture = null;
        this.getImageIfExists();
        this.showUpdatePhotoOk();
      },
        error => {
          loader.dismiss();
        });
  }

  cancel() {
    this.picture = null;
  }

  presentloading() {
    let loader = this.loadingControl.create({
      content: "Alterando Foto de perfil...",
    });
    loader.present();
    return loader;
  }

  trocarSenha(){
    this.navCtrl.push('TrocarSenhaPage');
  }

  showUpdatePhotoOk() {  
    let alert = this.alertCtrl.create({
        title: 'Sucesso!',
        message: 'Sua foto de perfil foi alterada, em alguns instantes ela atualizará.',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
  }
}
