import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SalleService } from 'src/app/shared/services/salle.service';

@Component({
  selector: 'app-list-salle',
  templateUrl: './list-salle.component.html',
  styleUrls: ['./list-salle.component.css']
})
export class ListSalleComponent implements OnInit {
  salles: any;
  showMsg: boolean = false;

  inputSearchedValue!: string;
  typeSalleSearchValue!: number;
  totalListSalles: any;
  searchedList: any = [];
  searchedList2: any = [];
  searchedList3: any = [];
  @ViewChild('closeModal') closeModal!: ElementRef;


  constructor(private salleService: SalleService) { }

  ngOnInit(): void {
    this.listSalles();
  }

  listSalles() {
    this.salleService.getSalles().subscribe(res => {
      console.log(res);
      this.salles = res;
      this.totalListSalles = res
    })
  }


  cancel() {
    this.closeModal.nativeElement.click();
  }

  idSalle!: number;
  onClick(event: number) {
    this.idSalle = event
    console.log("idSalle:", this.idSalle)
  }

  deleteSalle(id: number) {
    this.salleService.supprimerSalle(id).subscribe(res => {
      this.listSalles();
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
      } else if (this.searchedList3 && this.searchedList3.length > 0) {
        list = this.searchedList3;
      } else {
        list = this.totalListSalles;
      }
      this.searchedList = list.filter((x: any) =>
        x.nom.toUpperCase().includes(this.inputSearchedValue.toUpperCase())
      );
      this.salles = this.searchedList;
    }
    else {

      this.salles = this.totalListSalles;
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
        list = this.totalListSalles;
      }
      this.searchedList2 = list.filter((x: any) =>
        x.num == this.inputSearchedValue);
      this.salles = this.searchedList2;
    }
    else {
      this.salles = this.totalListSalles;
    }
  }

  onSelect(event: any) {
    this.typeSalleSearchValue = event.target.value;
    console.log('typeSalleSearchValue: ' + this.typeSalleSearchValue)

    if (this.typeSalleSearchValue && this.typeSalleSearchValue != 0) {
      let list: any = [];
      if (this.searchedList && this.searchedList.length > 0) {
        list = this.searchedList;
      } else if (this.searchedList2 && this.searchedList2.length > 0) {
        list = this.searchedList2;
      }
      else {
        list = this.totalListSalles;

      }
      this.searchedList3 = list.filter((x: any) => x.type == this.typeSalleSearchValue);
      this.salles = this.searchedList3;

    } else {
      this.salles = this.totalListSalles;
    }
  }



}
