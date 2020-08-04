import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../helper/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogHandlingService {

  constructor(public dialog: MatDialog) { }
  showDialog(data:any) {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '35%',
            height: '35%',
            disableClose: false,
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'Refresh') {
                window.location.reload();
            }
        });
    }


    showDeleteDialog(data:any) {
        
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '35%',
            height: '40%',
            disableClose: false,
            data: data
        });
        return dialogRef;
    }
}

