import { Component,OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailService } from '../shared/payment-detail.service';
import Swal from 'sweetalert2';
import swal,{ SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {
  constructor(public service: PaymentDetailService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: PaymentDetail) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

 /* onDelete(id: number) {
    if (confirm('Are you sure to delete this record?'))
      this.service.deletePaymentDetail(id)
        .subscribe({
          next: res => {
            this.service.list = res as PaymentDetail[]
            this.toastr.error('Deleted successfully', 'Payment Detail Register')
          },
          error: err => { console.log(err) }
        })
  }*/
 /* onDelete(id: number) {
    if (confirm('Are you sure to delete this record?'))
      
  }*/

  onDelete(id: number) {
   Swal.fire({
     title: 'Are you sure?',
     text: 'Open Your eyes',
     icon: 'warning',
     showCancelButton: true,
     confirmButtonText: 'Yes, delete it!',
     cancelButtonText: 'No, keep it'
   }).then((result) => {
     if (result.isConfirmed) {
      this.service.deletePaymentDetail(id)
      .subscribe({
        next: res => {
          this.service.list = res as PaymentDetail[]
          this.toastr.error('Deleted successfully')
        },
        error: err => { console.log(err) }
      })
     
     } else if (result.dismiss === Swal.DismissReason.cancel) {
       Swal.fire(
         'Cancelled',
         'you are in safe mode :)',
         'error'
       )
     }
   })
   }

}