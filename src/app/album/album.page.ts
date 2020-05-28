import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})

export class AlbumPage implements OnInit {
  photos: any;// 5000 PHOTOS
  photosPage: any[];
  private index: number = 0;
  private readonly offset: number = 10;
  valordabarra = 0;

  constructor(private albumService: AlbumService, private toastController: ToastController) {
    setInterval(() => {
      this.valordabarra += .05;
    }, 1000)

  }

  async mostrarToast() {
    const toast = await this.toastController.create({
      message: "Hello World :)",
      duration: 5000
    });
    toast.present();
  }

  async ngOnInit() {
    let response = await this.albumService.getPhotos();
    this.photos = response;
    this.photosPage = this.photos.slice(this.index,this.offset+this.index);
    // this.index = 0
    // this.offset = 10;
    this.index += this.offset;
    // this.index = 10;
    // this.offset = 10;
  }

  loadData(event) {
    setTimeout(() => {
      let newPhotos = this.photos.slice(this.index,this.offset+this.index);
      this.index += this.offset;
      
      for (let i=0;i<newPhotos.length;i++) {
        this.photosPage.push(newPhotos[i]);
      }
      console.log('Done');
      event.target.complete();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.photosPage.length == this.photos.length) {
        event.target.disabled = true;
      }
    }, 500);
  }

}
