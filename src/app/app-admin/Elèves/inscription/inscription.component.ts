import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';
import { EleveService } from 'src/app/shared/services/eleve.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  id!: number;
  annee_id!:number
  groupes: any;
  eleve:any
  data:any
  showMsg=false
  MsgError: boolean=false
  @ViewChild('inscriptionform') inscriptionform!: NgForm;


  constructor(private route: ActivatedRoute,private groupeService: GroupeService,public anneeService: AnneeScolaireService,private eleveService: EleveService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.data={
      eleve_id:this.id,
      groupe_id:0
  
    }
    this.getEleveById();
    this.listGroupes();
  }
  
  getEleveById(){
    this.eleveService.getEleveById(this.id,this.annee_id).subscribe(res=>{
      console.log(res);
      this.eleve= res;

    })

  }
  listGroupes() {
    this.groupeService.getGroupe(this.annee_id).subscribe(res => {
      console.log(res);
      this.groupes = res;
    })
  }
  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }

  inscrireEleve(){
    
    if (!this.inscriptionform.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true

    } else {
      this.eleveService.inscrireEleve(this.data).subscribe(res => {
        // this.inscriptionform.resetForm();
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)
      })
    }

  }

}
