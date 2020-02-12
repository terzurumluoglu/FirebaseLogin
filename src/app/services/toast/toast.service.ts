import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  success(title: string, message: string) {
    this.toastr.success(message, title);
  }

  info(title: string, message: string) {
    this.toastr.info(message, title);
  }

  warning(title: string, message: string) {
    this.toastr.warning(message, title);
  }

  danger(title: string, message: string) {
    this.toastr.error(message, title);
  }
}
