import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-providers';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule
  ]
})
export class Tab3Page {
  nama: string = '';
  isi: string = '';

  constructor(
    private postPvdr: PostProvider,
    private toastCtrl: ToastController
  ) {}

  kirimTestimoni() {
    if (this.nama === '' || this.isi === '') {
      this.toastCtrl.create({ message: 'Isi semua kolom!', duration: 2000 }).then(t => t.present());
      return;
    }
    else if (this.isi === '' || this.isi === '') {
      this.toastCtrl.create({ message: 'Isi semua kolom!', duration: 2000 }).then(t => t.present());
      return;
    }

    let body = {
      aksi: 'add_testimoni',
      nama: this.nama,
      isi: this.isi
    };

    this.postPvdr.postData(body, 'action.php').subscribe(data => {
      if (data.success) {
        this.toastCtrl.create({ message: 'Testimoni berhasil dikirim', duration: 2000 }).then(t => t.present());
        this.nama = '';
        this.isi = '';
      } else {
        this.toastCtrl.create({ message: 'Gagal mengirim testimoni', duration: 2000 }).then(t => t.present());
      }
    });
  }
}  