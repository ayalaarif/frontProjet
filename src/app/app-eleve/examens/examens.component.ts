import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DownloadFileService } from 'src/app/shared/services/download-file.service';
import { ExamenService } from 'src/app/shared/services/examen.service';

@Component({
  selector: 'app-examens',
  templateUrl: './examens.component.html',
  styleUrls: ['./examens.component.css']
})
export class ExamensComponent implements OnInit {
  GroupeId!: number
  examens: any
  lExamens!: number

  searchedList: any = [];
  inputSearchedValue!: string;
  totalListExamens: any;


  constructor(private examenService: ExamenService, private authService: AuthService, private downloadFileService: DownloadFileService) { }

  ngOnInit(): void {
    this.GroupeId = this.authService.getEleveGroupeId()
    this.examensEleve()

  }

  examensEleve() {
    this.examenService.examensEleve(this.GroupeId).subscribe(res => {
      console.log(this.GroupeId)
      console.log(res);
      this.examens = res;
      this.totalListExamens = res;


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
      list = this.totalListExamens;
      this.searchedList = list.filter((x: any) => x.enseignants[0].matiere.libelle.toUpperCase().includes(this.inputSearchedValue.toUpperCase()));
      this.examens = this.searchedList;

    } else {
      this.examens = this.totalListExamens;
    }
  }


}
