import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder ,Validators,AbstractControl, FormControl} from '@angular/forms';
import Validation from 'src/app/utils/validation';
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup = new FormGroup({
    username : new FormControl(''),
    pwd : new FormControl(''),
    acceptTerms:new FormControl(false),
  });
  submitted = false;
  constructor(private formBuilder : FormBuilder, private router :Router ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username:['',Validators.required,Validators.minLength(6),Validators.maxLength(20)],
      pwd :['',Validators.required,Validators.minLength(6),Validators.maxLength(40)]
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit(): void {

    this.submitted = true;
    this.router.navigateByUrl('/todo');

    if (this.loginForm.invalid) {
      return;
    }

    console.log(JSON.stringify(this.loginForm.value,null,2));
    alert("Welcome to TODO page");
  }


}

