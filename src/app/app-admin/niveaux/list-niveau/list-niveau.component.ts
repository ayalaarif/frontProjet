import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { NiveauService } from 'src/app/shared/services/niveau.service';

@Component({
  selector: 'app-list-niveau',
  templateUrl: './list-niveau.component.html',
  styleUrls: ['./list-niveau.component.css']
})
export class ListNiveauComponent implements OnInit {
  niveaux: any;
  showMsg: boolean = false;

  searchedList: any = [];
  inputSearchedValue!: string;
  totalListNiveaux: any;
  @ViewChild('closeModal') closeModal!: ElementRef;



  constructor(private niveauService: NiveauService) { }

  ngOnInit(): void {
    this.listNiveau();
  }

  listNiveau() {
    this.niveauService.getNiveau().subscribe(res => {
      console.log(res);
      this.niveaux = res;
      this.totalListNiveaux = res;

    })
  }

  cancel() {
    this.closeModal.nativeElement.click();
  }

  idNiveau!: number;
  onClick(event: number) {
    this.idNiveau = event
    console.log("idNiveau:", this.idNiveau)
  }

  deleteNiveau(id: number) {
    this.niveauService.supprimerNiveau(id).subscribe(res => {
      this.listNiveau();
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
      list = this.totalListNiveaux;
      this.searchedList = list.filter((x: any) => x.libelle.toUpperCase().includes(this.inputSearchedValue.toUpperCase()));
      this.niveaux = this.searchedList;

    } else {
      this.niveaux = this.totalListNiveaux;
    }
  }


}
