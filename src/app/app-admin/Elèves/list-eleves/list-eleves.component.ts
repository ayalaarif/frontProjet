import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Eleve } from 'src/app/shared/models/eleve.model';
import { EleveService } from 'src/app/shared/services/eleve.service';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';
import { AnneeScolaire } from 'src/app/shared/models/annee-scolaire.model';


@Component({
  selector: 'app-list-eleves',
  templateUrl: './list-eleves.component.html',
  styleUrls: ['./list-eleves.component.css']
})
export class ListElevesComponent implements OnInit {
  eleves: any;
  totalListEleve: any;
  searchedList: any = [];
  searchedList2: any = [];
  searchedList3: any = [];


  showMsg: boolean = false;
  id!: number;
  groupe!: any
  groupes: any;
  inputSearchedValue!: string;
  groupeSearchValue!: number;
  annee_id!: number
  annee: any
  elevesinscrits: any

  @ViewChild('closeModal') closeModal!: ElementRef;




  constructor(private eleveService: EleveService, private groupeService: GroupeService, public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a = sessionStorage.getItem('annee');
    if (a) {

      this.annee_id = JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.listEleves();
    this.getLastYear();

    this.listGroupes();

  }

  listEleves() {
    this.eleveService.getEleve(this.annee_id).subscribe(
      res => {
        console.log(res);
        this.eleves = res;
        this.totalListEleve = res;
        this.elevesinscrits = this.eleves.filter((e: any) => (e.groupes.length > 0))
      },
      error => {
        console.log(error)
      })
  }

  cancel() {
    this.closeModal.nativeElement.click();
  }

  idEleve!: number;
  onClick(event: number) {
    this.idEleve = event
    console.log("idEleve:", this.idEleve)
  }

  deleteEleve(id: number) {
    this.eleveService.supprimerEleve(id).subscribe(res => {
      this.listEleves();
      console.log(res);
      this.closeModal.nativeElement.click();
      this.showMsg = true;
      setTimeout(() => {
        this.showMsg = false;
      }, 2000)

    })
  }

  listGroupes() {
    this.groupeService.getGroupe(this.annee_id).subscribe(res => {
      console.log(res);
      this.groupes = res;
    })
  }


  getLastYear() {
    this.anneeService.getlastyear().subscribe(res => {
      console.log(res);
      this.annee = res;
      console.log(this.annee)

    })

  }
  getGroupeById() {
    this.groupeService.getGroupeById(this.id).subscribe(res => {
      console.log(res);
      this.groupe = res;

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
        list = this.totalListEleve;

      }
      this.searchedList = list.filter((x: any) =>
        x.nom.toUpperCase().includes(this.inputSearchedValue.toUpperCase()) ||
        x.prenom.toUpperCase().includes(this.inputSearchedValue.toUpperCase())
      );
      this.eleves = this.searchedList;
      console.log(this.eleves)
    }
    else {

      this.eleves = this.totalListEleve;
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
        list = this.totalListEleve;
      }
      this.searchedList2 = list.filter((x: any) =>
        x.matricule.toUpperCase().includes(this.inputSearchedValue.toUpperCase())
      );
      this.eleves = this.searchedList2;
    }
    else {
      this.eleves = this.totalListEleve;
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
  //       list = this.totalListEleve;

  //     }
  //     this.searchedList3 = list.filter((x: any) => x.groupes[0].id == this.groupeSearchValue);
  //     this.eleves = this.searchedList3;

  //   } else {
  //     this.eleves = this.totalListEleve;
  //   }
  // }


}
