import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { userModels } from '../../Models/transactionModels';
import { MatTableDataSource } from '@angular/material/table';
import { AuthServiceService } from '../../service/auth-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddUsersComponent } from '../add-users/add-users.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {
  usersFromApi: any;
  searchKey: any;
  data: any;
  _data: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['FirstName', 'LastName', 'OtherName', 'MaidenName', 'Sex', 'PhoneNumber', 'Address', 'Email', 'Next_Of_Kin', 'State', 'actions'];
  dataSource: MatTableDataSource<userModels>;
  closeResult: string;

  constructor(private authService: AuthServiceService, private matDialog: MatDialog) { }

  ngOnInit() {


    this.usersFromApi = this.authService.getRecords()
      .subscribe(list => {
        this._data  = list;
        this.dataSource = new MatTableDataSource(this._data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  // ----------- Initialize  ---------------

  onCreate() {
    this.authService.inititializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.matDialog.open(AddUsersComponent, dialogConfig);
  }


  // ------------- Modify User record ------
  onEdit(row) {
    this.authService.populate(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.matDialog.open(AddUsersComponent, dialogConfig);
  }


  onSearchClear() {
    this.searchKey = '';
    this.filterSearch();
  }


  // ----------------- filter search ------------------
  filterSearch() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }


  // ----------------Delete record -------------------
  onDelete(itbId: any) {
    console.log(itbId, "itbId")
    Swal.fire({
      title: 'Are you sure you want to delete this record ?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#14141F',
      cancelButtonColor: ' #f44336',
      confirmButtonText: 'Yes, delete it!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteUser(itbId)
        .subscribe(data => {
          this.data = data;
          if (this.data === 0){
              Swal.fire({
                title: 'Success',
                titleText: 'Deleted Successfully'
              });
              this.ngOnInit();
          }else {
            Swal.fire({
              title: 'error',
              titleText: 'An Error occured. Please try again later'
            });
          }
        });

      }
    });
  }





}
