import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DeleteDialogService {

  constructor( private dialog:MatDialog ) { }
  openConformDialog(){
    return this.dialog.open(DeleteDialogComponent,{
      width:'390px',
      panelClass:'conform-dialog-container',
      disableClose:true,
      position: {top:"100px"}

    });
  }
}
