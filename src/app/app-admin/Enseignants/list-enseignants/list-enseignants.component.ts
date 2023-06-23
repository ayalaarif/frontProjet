import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EnseignantService } from 'src/app/shared/services/enseignant.service';
import { MatiereService } from 'src/app/shared/services/matiere.service';

@Component({
  selector: 'app-list-enseignants',
  templateUrl: './list-enseignants.component.html',
  styleUrls: ['./list-enseignants.component.css']
})
export class ListEnseignantsComponent implements OnInit {
  enseignants: any;
  showMsg: boolean = false;

  inputSearchedValue!: string;
  matiereSearchValue!: number;
  totalListEnseignant: any;
  searchedList: any = [];
  searchedList2: any = [];
  searchedList3: any = [];
  matieres: any;
  @ViewChild('closeModal') closeModal!: ElementRef;


  constructor(private enseignantService: EnseignantService, private matiereService: MatiereService) { }

  ngOnInit(): void {
    this.listEnseignant();
    this.listMatiere()

  }

  listEnseignant() {
    this.enseignantService.getEnseignant().subscribe(res => {
      console.log(res);
      this.enseignants = res;
      this.totalListEnseignant = res;
    })
  }

  cancel() {
    this.closeModal.nativeElement.click();
  }

  idEnseignant!: number;
  onClick(event: number) {
    this.idEnseignant = event
    console.log("idEnseignant:", this.idEnseignant)
  }

  deleteEnseignant(id: number) {
    this.enseignantService.supprimerEnseignant(id).subscribe(res => {
      this.listEnseignant();
      console.log(res);
      this.closeModal.nativeElement.click();
      this.showMsg = true;
      setTimeout(() => {
        this.showMsg = false;
      }, 2000)

    })
  }

  listMatiere() {
    this.matiereService.getMatiere().subscribe(res => {
      console.log(res)
      this.matieres = res
    })
  }

  onInputSearch(event: any) {
    this.inputSearchedValue = event.target.value;
    console.log("inputSearchedValue: ", this.inputSearchedValue)
    if (this.inputSearchedValue && this.inputSearchedValue != "") {
      let list: any = [];
      if (this.searchedList2 && this.searchedList2.length > 0) {
        list = this.searchedList2;
      } else if (this.searchedList3 && this.searchedList3.length > 0) {
        list = this.searchedList3;
      } else {
        list = this.totalListEnseignant;
      }
      this.searchedList = list.filter((x: any) =>
        x.nom.toUpperCase().includes(this.inputSearchedValue.toUpperCase()) ||
        x.prenom.toUpperCase().includes(this.inputSearchedValue.toUpperCase())
      );
      this.enseignants = this.searchedList;
    }
    else {

      this.enseignants = this.totalListEnseignant;
    }
  }

  onInputSearch2(event: any) {
    this.inputSearchedValue = event.target.value;
    console.log("inputSearchedValue: ", this.inputSearchedValue)
    if (this.inputSearchedValue && this.inputSearchedValue != "") {
      let list: any = [];
      if (this.searchedList && this.searchedList.length > 0) {
        list = this.searchedList;
      } else if (this.searchedList3 && this.searchedList3.length > 0) {
        list = this.searchedList3;
      }
      else {
        list = this.totalListEnseignant;
      }
      this.searchedList2 = list.filter((x: any) =>
        x.cin == this.inputSearchedValue);
      this.enseignants = this.searchedList2;
    }
    else {
      this.enseignants = this.totalListEnseignant;
    }
  }

  onSelect(event: any) {
    this.matiereSearchValue = event.target.value;
    console.log('matiereSearchValue: ' + this.matiereSearchValue)

    if (this.matiereSearchValue && this.matiereSearchValue != 0) {
      let list: any = [];
      if (this.searchedList && this.searchedList.length > 0) {
        list = this.searchedList;
      } else if (this.searchedList2 && this.searchedList2.length > 0) {
        list = this.searchedList2;
      }
      else {
        list = this.totalListEnseignant;
      }

      this.searchedList3 = list.filter((x: any) => x.matiere_id == this.matiereSearchValue);
      this.enseignants = this.searchedList3;

    } else {
      this.enseignants = this.totalListEnseignant;
    }
  }



}
