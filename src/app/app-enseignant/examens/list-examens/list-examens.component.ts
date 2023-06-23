import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExamenService } from 'src/app/shared/services/examen.service';
import { DownloadFileService } from 'src/app/shared/services/download-file.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';
@Component({
  selector: 'app-list-examens',
  templateUrl: './list-examens.component.html',
  styleUrls: ['./list-examens.component.css']
})
export class ListExamensComponent implements OnInit {
  examens: any;
  showMsg: boolean = false;
  id!: number
  annee_id!: number
  @ViewChild('closeModal') closeModal!: ElementRef;
  totalListExamen: any;
  searchedList: any = [];
  searchedList2: any = [];
  inputSearchedValue!: string;

  constructor(private examenService: ExamenService, private downloadFileService: DownloadFileService, private authService: AuthService, public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    this.id = this.authService.getEnseignantId()
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a = sessionStorage.getItem('annee');
    if (a) {

      this.annee_id = JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.listExamen();
  }

  listExamen() {
    this.examenService.listExamenEnseignant(this.id, this.annee_id).subscribe(res => {
      console.log(res);
      this.examens = res;
      this.totalListExamen= res;
    })

  }

  cancel() {
    this.closeModal.nativeElement.click();
  }

  idExam!: number;
  onClick(event: number) {
    this.idExam = event
    console.log("idExam:", this.idExam)
  }

  deleteExamen(id: number) {
    this.examenService.supprimerExamen(id).subscribe(res => {
      this.listExamen();
      console.log(res);
      this.closeModal.nativeElement.click();
      this.showMsg = true;
      setTimeout(() => {
        this.showMsg = false;
      }, 2000)

    })
  }

  downloadFile(id: number, fileName: string) {
    this.downloadFileService.downloadFile(id).subscribe((res: any) => {
      console.log(res)
      var blob = new Blob([res]);

      const downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = fileName;
      link.click();

    })
  }
  openFile(id: number) {
    this.downloadFileService.downloadFile(id).subscribe((res: any) => {
      console.log(res)
      var blob = new Blob([res]);
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    })
  }
  downloadFileCorrection(id: number, fileName: string) {
    this.downloadFileService.downloadFileCorrection(id).subscribe((res: any) => {
      console.log(res)
      var blob = new Blob([res]);

      const downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = fileName;
      link.click();

    })
  }
  openFileCorrection(id: number) {
    this.downloadFileService.downloadFileCorrection(id).subscribe((res: any) => {
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
      if (this.searchedList2 && this.searchedList2.length > 0) {
        list = this.searchedList2;
      } else {
        list = this.totalListExamen;
      }
      // list = this.totalListEleve;
      this.searchedList = list.filter((x: any) =>
      x.libelle.toUpperCase().includes(this.inputSearchedValue.toUpperCase()) 
      );
      this.examens = this.searchedList;
    }
    else {
      this.examens = this.totalListExamen;
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
        list = this.totalListExamen;
      }
      // list = this.totalListEleve;
      this.searchedList2 = list.filter((x: any) =>
        x.session.nom.toUpperCase().includes(this.inputSearchedValue.toUpperCase())
      );
      this.examens = this.searchedList2;
    }
    else {
      this.examens = this.totalListExamen;
    }
  }



}


