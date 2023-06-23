import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PunitionService } from 'src/app/shared/services/punition.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';

@Component({
  selector: 'app-liste-punitions',
  templateUrl: './liste-punitions.component.html',
  styleUrls: ['./liste-punitions.component.css']
})
export class ListePunitionsComponent implements OnInit {
  punitions : any
  id!:number
  showMsg: boolean= false
  annee_id!:number

  constructor(private ps: PunitionService,public anneeService: AnneeScolaireService) { }
  totalListPunition: any;
  searchedList: any = [];
  searchedList2: any = [];
  inputSearchedValue!: string;

  @ViewChild('closeModal') closeModal!: ElementRef;
  

  ngOnInit(): void {
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.listePunitions()
  }

  listePunitions(){
    this.ps.getPunition(this.annee_id).subscribe(res=>{
      console.log(res);
      this.punitions=res;
      this.totalListPunition= res

    })
  }

  cancel() {
    this.closeModal.nativeElement.click();
  }

  idPunition!: number;
  onClick(event: number) {
    this.idPunition = event
    console.log("idPunition:", this.idPunition)
  }

  deletePunition(id: number){
    this.ps.supprimerPunition(id).subscribe(res=>{
      this.listePunitions();
      console.log(res);
      this.closeModal.nativeElement.click();
      this.showMsg= true;
      setTimeout( ()=>{
        this.showMsg=false;
      },2000)

    })
  }

  onInputSearch(event: any) {
    this.inputSearchedValue = event.target.value;
    console.log("inputSearchedValue: ", this.inputSearchedValue)
    if (this.inputSearchedValue && this.inputSearchedValue != "") {
      let list: any = [];
      if (this.searchedList2 && this.searchedList2.length > 0) {
        list = this.searchedList2;
      } else {
        list = this.totalListPunition;
      }
      // list = this.totalListEleve;
      this.searchedList = list.filter((x: any) =>
      x.eleve.nom.toUpperCase().includes(this.inputSearchedValue.toUpperCase()) ||
        x.eleve.prenom.toUpperCase().includes(this.inputSearchedValue.toUpperCase())
      );
      this.punitions = this.searchedList;
    }
    else {
      this.punitions = this.totalListPunition;
    }
  }

  onInputSearch2(event: any) {
    this.inputSearchedValue = event.target.value;
    console.log("inputSearchedValue: ", this.inputSearchedValue)
    if (this.inputSearchedValue && this.inputSearchedValue != "") {
      let list: any = [];
      if (this.searchedList && this.searchedList.length > 0) {
        list = this.searchedList;
     
      }
      else {
        list = this.totalListPunition;
      }
      // list = this.totalListEleve;
      this.searchedList2 = list.filter((x: any) =>
        x.eleve.matricule.toUpperCase().includes(this.inputSearchedValue.toUpperCase())
      );
      this.punitions = this.searchedList2;
    }
    else {
      this.punitions = this.totalListPunition;
    }
  }

  


}
