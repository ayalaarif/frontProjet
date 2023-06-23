import { Component, OnInit } from '@angular/core';
import { ParentService } from 'src/app/shared/services/parent.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';

@Component({
  selector: 'app-list-parents',
  templateUrl: './list-parents.component.html',
  styleUrls: ['./list-parents.component.css']
})
export class ListParentsComponent implements OnInit {
  parents: any
  annee_id!:number
  inputSearchedValue!: string;
  totalListParent: any;
  searchedList: any = [];
  searchedList2: any = [];

  constructor(private parentService: ParentService,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.listParent();
  }

  listParent(){
    this.parentService.getParent(this.annee_id).subscribe(res=>{
      console.log(res);
      this.parents= res;
      this.totalListParent=res
    })
  }

  onInputSearch(event: any) {
    this.inputSearchedValue = event.target.value;
    console.log("inputSearchedValue: ", this.inputSearchedValue)
    if (this.inputSearchedValue && this.inputSearchedValue != "") {
      let list: any = [];
      if (this.searchedList2 && this.searchedList2.length > 0) {
        list = this.searchedList2;
      }else {
        list = this.totalListParent;
      }
      this.searchedList = list.filter((x: any) =>
        x.nomComplet_pere.toUpperCase().includes(this.inputSearchedValue.toUpperCase()) ||
        x.nomComplet_mere.toUpperCase().includes(this.inputSearchedValue.toUpperCase())
      );
      this.parents = this.searchedList;
    }
    else {

      this.parents = this.totalListParent;  
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
        list = this.totalListParent;
      }
      this.searchedList2 = list.filter((x: any) =>
        x.cin_pere == this.inputSearchedValue || x.cin_mere == this.inputSearchedValue );
      this.parents = this.searchedList2;
    }
    else {
      this.parents = this.totalListParent;
    }
  }


}
