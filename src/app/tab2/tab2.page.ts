import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-providers';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule
  ]
})
export class Tab2Page implements OnInit {
  
  nomeja: string = '';
  nama: string = '';
  nohp: string = '';
  email: string = '';
  alamat: string = '';
  menumakanan: string = '';
  menuminuman: string = '';
  tipepembayaran: string = '';


  constructor(
    private router: Router,
    public toastController: ToastController,
    private postPvdr: PostProvider,
  ) {

  }

  ngOnInit() {
  }

  async addPemesanan() {
    if (this.nomeja == '') {
      const toast = await this.toastController.create({
        message: 'No meja harus di isi',
        duration: 2000
      });
      toast.present();
   } else if (this.nama == '') {
      const toast = await this.toastController.create({
        message: 'Nama lengkap harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.nohp == '') {
      const toast = await this.toastController.create({
        message: 'No HP/WA harus di isi',
        duration: 2000
      });
      toast.present();
    
    } else if (this.email == '') {
      const toast = await this.toastController.create({
        message: 'Email harus di isi',
        duration: 2000
      });
      toast.present();

       } else if (this.alamat == '') {
      const toast = await this.toastController.create({
        message: 'Alamat harus di isi',
        duration: 2000
      });
      toast.present();

    } else if (this.menumakanan == '') {
      const toast = await this.toastController.create({
        message: 'Menu makanan harus di isi',
        duration: 2000
      });
      toast.present();

    } else if (this.menuminuman == '') {
      const toast = await this.toastController.create({
        message: 'Menu minuman harus di isi',
        duration: 2000
      });
      toast.present();

      } else if (this.tipepembayaran == '') {
      const toast = await this.toastController.create({
        message: 'tipe pembayaran harus di isi',
        duration: 2000
      });
      toast.present();
      
    } else {
      let body = {
        nomeja:this.nomeja,
        nama: this.nama,
        nohp: this.nohp,
        email: this.email,
        alamat: this.alamat,
        menumakanan: this.menumakanan,
        menuminuman: this.menuminuman,
        tipepembayaran: this.tipepembayaran,
        aksi:'add_pemesanan',
      };
      this.postPvdr.postData(body, 'action.php').subscribe(async data => {
        var alertpesan = data.msg;
        if (data.success) {
          this.router.navigate(['/tab4']);
          const toast = await this.toastController.create({
            message: 'Selamat! Pemesanan Makan & Minum sukses.',
            duration: 2000
          });
          toast.present();
        } else {
          const toast = await this.toastController.create({
            message: alertpesan,
            duration: 2000
          });
          // YANG KURANG:
          toast.present(); // <-- ini harus ditambahkan
        }

      });

    }
  }
}