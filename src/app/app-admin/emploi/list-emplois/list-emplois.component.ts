import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmploiService } from 'src/app/shared/services/emploi.service';
// import { GroupeService } from 'src/app/shared/services/groupe.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';
import { NiveauService } from 'src/app/shared/services/niveau.service';

@Component({
  selector: 'app-list-emplois',
  templateUrl: './list-emplois.component.html',
  styleUrls: []
})
export class ListEmploisComponent implements OnInit {
  emplois: any;
  showMsg: boolean= false;
  annee_id!:number
  @ViewChild('closeModal') closeModal!: ElementRef;

  searchedList: any = [];
  inputSearchedValue!: string;
  totalListEmplois: any;
  niveaux: any;
  niveauSearchValue!: number;



  constructor(private emploiService: EmploiService,public anneeService: AnneeScolaireService, private niveauService: NiveauService) { }

  ngOnInit(): void {
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.listEmploi();
    this.listNiveau();

  }

  listNiveau() {
    this.niveauService.getNiveau().subscribe(res => {
      console.log(res);
      this.niveaux = res;
    })
  }
  
  listEmploi(){
    this.emploiService.getEmploi(this.annee_id).subscribe(res=>{
      console.log(res);
      this.emplois=res;
      this.totalListEmplois = res;

    })
  }

  cancel() {
    this.closeModal.nativeElement.click();
  }

  idEmploi!: number;
  onClick(event: number) {
    this.idEmploi = event
    console.log("idEmploi:", this.idEmploi)
  }

  deleteEmploi(id: number){
    this.emploiService.supprimerEmploi(id).subscribe(res=>{
      this.listEmploi();
      console.log(res);
      this.closeModal.nativeElement.click();
      this.showMsg= true;
      setTimeout( ()=>{
        this.showMsg=false;
      },2000)

    })
  }

  // onSelect(event: any) { 
  //     if (this.searchedList && this.searchedList.length > 0) {
  //       let list: any = [];
  //       list = this.totalListEmplois;
  //       this.searchedList = list.filter((x: any) => x.groupe.niveau.libelle == this.inputSearchedValue);
  //       this.emplois = this.searchedList;
  //     }
  //     else {
  //     this.emplois = this.totalListEmplois;
  //   }
  // }


  // onSelect(event: any) {
  //   this.niveauSearchValue = event.target.value;
  //   console.log('niveauSearchValue: ' + this.niveauSearchValue)

  //   if (this.niveauSearchValue && this.niveauSearchValue != 0) {
  //     let list: any = [];
  //     if (this.searchedList && this.searchedList.length > 0) {
  //       list = this.totalListEmplois;
      
  //     this.searchedList = list.filter((x: any) => x.groupe.niveau.id == this.niveauSearchValue);
  //     this.emplois = this.searchedList;

  //   } else {
  //     this.emplois = this.totalListEmplois;
  //   }
  // }
  // }

  onInputSearch(event: any) {
    this.inputSearchedValue = event.target.value;
    console.log("inputSearchedValue: ", this.inputSearchedValue)
    if (this.inputSearchedValue && this.inputSearchedValue != "") {
      let list: any = [];
      list = this.totalListEmplois;
      this.searchedList = list.filter((x: any) => x.groupe.niveau.libelle.toUpperCase().includes(this.inputSearchedValue.toUpperCase()));
      this.emplois = this.searchedList;

    } else {
      this.emplois = this.totalListEmplois;
    }
  }


}

