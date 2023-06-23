import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CoursService } from 'src/app/shared/services/cours.service';
import { AuthService } from 'src/app/shared/services/auth.service';
 import { DownloadFileService } from 'src/app/shared/services/download-file.service';
 

@Component({
  selector: 'app-list-cours',
  templateUrl: './list-cours.component.html',
  styleUrls: ['./list-cours.component.css']
})
export class ListCoursComponent implements OnInit {
  cours: any
  showMsg: boolean= false
  id!:number
  
  searchedList: any = [];
  inputSearchedValue!: string;
  totalListCours: any;
  @ViewChild('closeModal') closeModal!: ElementRef;



  constructor(private coursService: CoursService,private authService: AuthService,private downloadFileService: DownloadFileService) { }

  ngOnInit(): void {
    this.id=this.authService.getEnseignantId()
     this.listCours();
  }
  listCours(){
    this.coursService.getCours(this.id).subscribe(res=>{
      console.log(this.id)
      console.log(res);
      this.cours=res;
      this.totalListCours=res

    })
  }

  cancel() {
    this.closeModal.nativeElement.click();
  }

  idCours!: number;
  onClick(event: number) {
    this.idCours = event
    console.log("idCours:", this.idCours)
  }

  deleteCours(id: number){
    this.coursService.supprimerCours(id).subscribe(res=>{
      this.listCours();
      console.log(res);
      this.closeModal.nativeElement.click();
      this.showMsg= true;
      setTimeout( ()=>{
        this.showMsg=false;
      },2000)

    })
  }

  downloadFile(id: number,fileName:string){
    this.downloadFileService.downloadFile(id).subscribe((res:any)=>{
      console.log(res)
  var blob = new Blob([res]);

  const downloadURL = window.URL.createObjectURL(blob);
  var link = document.createElement('a');
  link.href = downloadURL;
  link.download =fileName;
  link.click();
     
    })
  }

  openFile(id: number){
    this.downloadFileService.downloadFile(id).subscribe((res:any)=>{
      console.log(res)
      var blob = new Blob([res]);
  const fileURL = URL.createObjectURL(res);
  window.open(fileURL, '_blank');
    })
  }

  onInputSearch(event: any) {
    this.inputSearchedValue = event.target.value;
    console.log("inputSearchedValue: ", this.inputSearchedValue)
    if (this.inputSearchedValue && this.inputSearchedValue != "") {
      let list: any = [];
      list = this.totalListCours;
      this.searchedList = list.filter((x: any) => x.libelle.toUpperCase().includes(this.inputSearchedValue.toUpperCase()));
      this.cours = this.searchedList;

    } else {
      this.cours = this.totalListCours;
    }
  }

}
