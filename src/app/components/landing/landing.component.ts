import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ViewMapService } from 'src/app/services/view-map.service';
import {
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  imageVal:any;
  logoutFlag:boolean = true;

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private services:ViewMapService,public snackBar: MatSnackBar) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  ngOnInit(): void {
  }


  submit() {
    if (this.form.valid) {
      let payload = {
        "username":this.form.controls.username.value,
        "password":this.form.controls.password.value
      }
      this.services.login(payload).subscribe((data)=>{
        if(data){
          this.imageVal = data['Data'].map
          this.logoutFlag = false;
          
        }
      },error=>{
        console.log(error);
        this.imageVal = "";
        this.openSnackBar(error.error.Data,"OK")
        this.logoutFlag = true;
      });
    }
  }

  onLogout(){
    this.logoutFlag = true;
    this.imageVal = ""
  }

}
