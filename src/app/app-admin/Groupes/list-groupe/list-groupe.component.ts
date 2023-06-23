import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';
import { NiveauService } from 'src/app/shared/services/niveau.service';

@Component({
  selector: 'app-list-groupe',
  templateUrl: './list-groupe.component.html',
  styleUrls: ['./list-groupe.component.css']
})
export class ListGroupeComponent implements OnInit {
  groupes: any;
  showMsg: boolean= false;
  annee_id!:number
  inputSearchedValue!: string;
  totalListGroupe: any;
  searchedList: any = [];
  searchedList2: any = [];
  niveauSearchValue!: number;

  niveaux: any;
  @ViewChild('closeModal') closeModal!: ElementRef;




  constructor(private groupeService: GroupeService, private niveauService: NiveauService,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.listGroupe();
    this.listNiveau();

  }

 
  listNiveau() {
    this.niveauService.getNiveau().subscribe(res => {
      console.log(res);
      this.niveaux = res;
    })
  }

  listGroupe() {
    this.groupeService.getGroupe(this.annee_id).subscribe(res=>{
      console.log(res);
      this.groupes = res;
      this.totalListGroupe = res
    })
  }


  cancel() {
    this.closeModal.nativeElement.click();
  }

  idGroupe!: number;
  onClick(event: number) {
    this.idGroupe = event
    console.log("idGroupe:", this.idGroupe)
  }

  deleteGroupe(id: number) {
    this.groupeService.supprimerGroupe(id).subscribe(res => {
      this.listGroupe();
      console.log(res);
      this.closeModal.nativeElement.click();
      this.showMsg = true;
      setTimeout(() => {
        this.showMsg = false;
      }, 2000)
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
        list = this.totalListGroupe;
      }
      this.searchedList = list.filter((x: any) =>
        x.num == this.inputSearchedValue
      );
      this.groupes = this.searchedList;
    }
    else {
      this.groupes = this.totalListGroupe;
    }
  }

  onSelect(event: any) {
    this.niveauSearchValue = event.target.value;
    console.log('niveauSearchValue: ' + this.niveauSearchValue)

    if (this.niveauSearchValue && this.niveauSearchValue != 0) {
      let list: any = [];
      if (this.searchedList && this.searchedList.length > 0) {
        list = this.searchedList;
      }
      else {
        list = this.totalListGroupe;
      }
      this.searchedList2 = list.filter((x: any) => x.niveau_id == this.niveauSearchValue);
      this.groupes = this.searchedList2;

    } else {
      this.groupes = this.totalListGroupe;
    }
  }

}
