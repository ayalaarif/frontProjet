import { Component, OnInit ,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';
import { AnneeScolaire } from 'src/app/shared/models/annee-scolaire.model';

@Component({
  selector: 'app-modifier-annee',
  templateUrl: './modifier-annee.component.html',
  styleUrls: ['./modifier-annee.component.css']
})
export class ModifierAnneeComponent implements OnInit {
  id!: number
  data:any
  annee=new AnneeScolaire()
  @ViewChild('anneeform') anneeform!: NgForm
  showMsg: boolean=false
  MsgError: boolean=false


  constructor(private route: ActivatedRoute,private anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.getAnnee();

  }
  getAnnee() {
    this.anneeService.getAnneeById(this.id).subscribe(res => {
      console.log(res);
      this.data = res;
      this.annee = this.data;
    })
  }
  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }


  modifierAnnee() {
    if (!this.anneeform.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true

    } else {
      this.anneeService.modifierAnnee(this.id, this.annee).subscribe(res => {
        // this.anneeform.resetForm();
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)
      })
    }
  }
}
