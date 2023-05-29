import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder ,Validators,FormControl,AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';

import Validation from 'src/app/utils/validation';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
    signupForm : FormGroup = new FormGroup({
    fname : new FormControl(''),
    lname : new FormControl(''),
    email : new FormControl(''),
    username : new FormControl(''),
    pwd : new FormControl(''),
    cpwd : new FormControl(''),
    acceptTerms:new FormControl(false)
  });
  submitted = false;
  username: any;

  constructor(private formBuilder : FormBuilder, private route : Router, private http : HttpClient, ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        fname: ['', Validators.required],
        lname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        pwd: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        cpwd: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  onSubmit():void{
    
    this.route.navigateByUrl('/todo');
    this.submitted = true;
    // const navigationDetails:string[]=['/todo'];

    if (this.signupForm.invalid) {
      return;
    }

    console.log(JSON.stringify(this.signupForm.value, null, 2));
    alert("registered sucessfully");
  }

  onReset(): void {
    this.submitted = false;
    this.signupForm.reset();
  }

  }

