import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ParentService } from 'src/app/shared/services/parent.service';

@Component({
  selector: 'app-modifier-profile',
  templateUrl: './modifier-profile.component.html',
  styleUrls: ['./modifier-profile.component.css']
})
export class ModifierProfileComponent implements OnInit {
  id!: number;
  parent!: any
  showMsg: boolean=false
  MsgError: boolean=false
  annee_id!:number
  @ViewChild('modifierProfileform') modifierProfileform!: NgForm


  constructor(private route: ActivatedRoute,private ps:ParentService) { }

  ngOnInit(): void {
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.getParentById()
  }

  getParentById(){
    this.ps.getParentById(this.id,this.annee_id).subscribe(res=> {
      console.log(res);
      this.parent= res;
    })
  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }

  modifierProfileParent() {
    if (!this.modifierProfileform.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true

    } else {
      this.ps.modifierParent(this.id, this.parent).subscribe(res => {
        // this.modifierProfileform.resetForm();
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)
      })
    }
  }


}
