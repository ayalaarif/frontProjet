import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { PunitionService } from 'src/app/shared/services/punition.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';
@Component({
  selector: 'app-liste-punitions',
  templateUrl: './liste-punitions.component.html',
  styleUrls: ['./liste-punitions.component.css']
})
export class ListePunitionsComponent implements OnInit {
  punitions : any
  showMsg: boolean= false
  id!:number
  annee_id!:number
  totalListPunitions: any;
  searchedList: any = [];
  searchedList2: any = [];
  inputSearchedValue!: string;
  groupeSearchValue!: number;

  groupes: any;
  @ViewChild('closeModal') closeModal!: ElementRef;



  constructor(private authService: AuthService, private ps: PunitionService, private gs: GroupeService,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    // console.log(this.annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.id=this.authService.getEnseignantId()
    this.listePunitions()
    // this.listGroupes();



  }

  // listGroupes() {
  //   this.gs.listGroupe(this.id,this.annee_id).subscribe(res => {
  //     this.groupes = res;
  //     console.log(this.groupes);

  //   })
  // }

  listePunitions(){
    this.ps.getPunitionsByEnseignantId(this.id,this.annee_id).subscribe(res=>{
      console.log("testttt ",res);
      this.punitions=res;
      this.totalListPunitions=res
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
        list = this.totalListPunitions;
      }
      this.searchedList = list.filter((x: any) =>
        x.eleve.nom.toUpperCase().includes(this.inputSearchedValue.toUpperCase()) ||
        x.eleve.prenom.toUpperCase().includes(this.inputSearchedValue.toUpperCase())
      );
      this.punitions = this.searchedList;
    }
    else {
    
      this.punitions = this.totalListPunitions;
    
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
        list = this.totalListPunitions;
      }
      // list = this.totalListEleve;
      this.searchedList2 = list.filter((x: any) =>
        x.eleve.matricule.toUpperCase().includes(this.inputSearchedValue.toUpperCase())
      );
      this.punitions = this.searchedList2;
    }
    else {
      this.punitions = this.totalListPunitions;
    }
  }

 
  // onSelect(event: any) {
  //   this.groupeSearchValue = event.target.value;
  //   console.log('groupeSearchValue: ' + this.groupeSearchValue)

  //   if (this.groupeSearchValue && this.groupeSearchValue != 0) {
  //     let list: any = [];
  //     if (this.searchedList && this.searchedList.length > 0) {
  //       list = this.searchedList;
  //     } else if (this.searchedList2 && this.searchedList2.length > 0) {
  //       list = this.searchedList2;
  //     }
  //     else {
  //       list = this.totalListPunitions;

  //     }
  //     this.searchedList2 = list.filter((x: any) => x.eleve.groupes[0].id == this.groupeSearchValue);
  //     this.punitions = this.searchedList2;

  //   } else {
  //     this.punitions = this.totalListPunitions;
  //   }
  // }





}
