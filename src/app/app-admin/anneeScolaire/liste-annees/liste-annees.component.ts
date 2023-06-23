import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnneeScolaire } from 'src/app/shared/models/annee-scolaire.model';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';
@Component({
  selector: 'app-liste-annees',
  templateUrl: './liste-annees.component.html',
  styleUrls: ['./liste-annees.component.css']
})
export class ListeAnneesComponent implements OnInit {
  annees: any
  showMsg: boolean = false;
  A = new AnneeScolaire()
  @ViewChild('closeModal') closeModal!: ElementRef;

  searchedList: any = [];
  inputSearchedValue!: string;
  totalListAnnees: any;

  constructor(private anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    this.listeAnnees();
  }
  listeAnnees() {
    this.anneeService.getAnnees().subscribe(res => {
      console.log(res);
      this.annees = res;
      this.totalListAnnees = res;

    })
  }

  cancel() {
    this.closeModal.nativeElement.click();
  }

  idAnneeScolaire!: number;
  onClick(event: number) {
    this.idAnneeScolaire = event
    console.log("idAnneeScolaire:", this.idAnneeScolaire)
  }

  supprimerAnnee(id: number){
    this.anneeService.supprimerAnnee(id).subscribe(res=>{
      this.listeAnnees();
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
      list = this.totalListAnnees;
      this.searchedList = list.filter((x: any) => x.annee.toUpperCase().includes(this.inputSearchedValue.toUpperCase()));
      this.annees = this.searchedList;

    } else {
      this.annees = this.totalListAnnees;
    }
  }



}
