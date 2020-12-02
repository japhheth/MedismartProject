import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../service/auth-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  btnState: any;
  constructor(public authService: AuthServiceService,
    private dialogRef: MatDialogRef<AddUsersComponent>
             ) { }

  ngOnInit() {

    this.btnState = this.authService.userForm.value.itbid !== '' ? 'Modify' : 'Add';
  }


  // ------------------ Prevent letters-----------
  onKeyUp(evt): boolean {
    const charCode = evt.which ? evt.which : evt.keyCode;
    return (charCode > 31 && (charCode < 48 || charCode > 57)) ? false : true;

  }





  onAddUser() {
    const postedData = {...this.authService.userForm.value};
    if (this.authService.userForm.valid) {
      if (this.authService.userForm.get('itbid').value !== '') {
        console.log(this.authService.userForm.value, 'values');
        this.authService.updateTransaction(this.authService.userForm.value)
        .subscribe(data => {
          if (data === 0){
            Swal.fire({
              title: 'Success',
              titleText: 'Updated Successfully'
            });
            this.authService.userForm.reset();
            this.onClose();
            window.location.reload();

          }else {
            Swal.fire({
              title: 'error',
              titleText: 'An Error occured. Please try again later'
            });
          }
        });
      }
      else {
        this.authService.addData(postedData)
          .subscribe(data => {
            if (data === 0) {
              Swal.fire({
                title: 'Success',
                titleText: 'Added Successfully'
              });
              window.location.reload();
            }else {
              Swal.fire({
                title: 'error',
                titleText: 'An Error occured. Please try again later'
              });
            }
            console.log(data, 'data');
          });
        this.onClose();
      }
    }



  }
  // ---------------- Reset Form input ----------------
  onClose() {
    this.authService.userForm.reset();
    this.authService.inititializeFormGroup();
    this.dialogRef.close();
  }


}
