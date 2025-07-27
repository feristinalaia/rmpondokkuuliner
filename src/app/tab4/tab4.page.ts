import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-providers';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule
  ]
})
export class Tab4Page implements OnInit {

  pemesanans: any[] = [];
  start = 0;
  limit = 5;

  constructor(
    public toastController: ToastController,
    private postPvdr: PostProvider // ✅ Sudah betul sekarang
  ) {}

  ngOnInit() {
    // Bisa tambahkan this.loadPemesanan(); jika ingin langsung load saat dibuka
  }

  ionViewWillEnter() {
    this.pemesanans = [];
    this.start = 0;
    this.loadPemesanan();
  }

  doRefresh(event: any) {
    setTimeout(() => {
      this.ionViewWillEnter(); // reload dari awal
      event.target.complete();
    }, 500);
  }

  loadData(event: any) {
    this.start += this.limit;
    setTimeout(() => {
      this.loadPemesanan().then(() => {
        event.target.complete();
      });
    }, 500);
  }

  async loadPemesanan(): Promise<void> {
    let body = {
      aksi: 'getdata', // pastikan cocok dengan yang di action.php
      start: this.start,
      limit: this.limit
    };

    this.postPvdr.postData(body, 'action.php').subscribe(async data => {
      if (data.success) {
        this.pemesanans = this.pemesanans.concat(data.result);
      } else {
        const toast = await this.toastController.create({
          message: 'Gagal memuat data.',
          duration: 2000
        });
        toast.present();
      }
    });
  }
}