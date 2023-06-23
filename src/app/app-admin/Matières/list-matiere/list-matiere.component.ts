import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatiereService } from 'src/app/shared/services/matiere.service';

@Component({
  selector: 'app-list-matiere',
  templateUrl: './list-matiere.component.html',
  styleUrls: ['./list-matiere.component.css']
})
export class ListMatiereComponent implements OnInit {
  matieres:any;
  showMsg: boolean= false;

  searchedList: any = [];
  inputSearchedValue!: string;
  totalListMatieres: any;
  @ViewChild('closeModal') closeModal!: ElementRef;


  constructor(private matiereService:MatiereService) { }

  ngOnInit(): void {
    this.listMatiere()
  }

  listMatiere(){
    this.matiereService.getMatiere().subscribe(res=>{
      console.log(res)
      this.matieres=res
      this.totalListMatieres= res
    })
  }

  cancel() {
    this.closeModal.nativeElement.click();
  }

  idMatiere!: number;
  onClick(event: number) {
    this.idMatiere = event
    console.log("idMatiere:", this.idMatiere)
  }

  deleteMatiere(id:number){
    this.matiereService.supprimerMatiere(id).subscribe(res=>{
      this.listMatiere()
      this.closeModal.nativeElement.click();
      this.showMsg= true
      setTimeout( ()=>{
        this.showMsg=false;
      },2000)
      console.log(res)

    })
  }

  onInputSearch(event: any) {
    this.inputSearchedValue = event.target.value;
    console.log("inputSearchedValue: ", this.inputSearchedValue)
    if (this.inputSearchedValue && this.inputSearchedValue != "") {
      let list: any = [];
      list = this.totalListMatieres;
      this.searchedList = list.filter((x: any) => x.libelle.toUpperCase().includes(this.inputSearchedValue.toUpperCase()));
      this.matieres = this.searchedList;

    } else {
      this.matieres = this.totalListMatieres;
    }
  }



}
