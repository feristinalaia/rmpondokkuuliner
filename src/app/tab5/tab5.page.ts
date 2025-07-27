import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-providers';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule
  ]
})
export class Tab5Page implements OnInit {
  testimoniList: any[] = [];

  constructor(
    private postPvdr: PostProvider,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadTestimoni();
  }

  async loadTestimoni() {
    let body = { aksi: 'get_testimoni' };

    this.postPvdr.postData(body, 'action.php').subscribe(async res => {
      if (res.success) {
        this.testimoniList = res.result;
      } else {
        const toast = await this.toastCtrl.create({
          message: 'Gagal mengambil testimoni',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    }, async err => {
      const toast = await this.toastCtrl.create({
        message: 'Koneksi ke server gagal',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    });
  }

  doRefresh(event: any) {
    this.loadTestimoni();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}