import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DownloadFileService } from 'src/app/shared/services/download-file.service';
import { TraveauService } from 'src/app/shared/services/traveau.service';

@Component({
  selector: 'app-travaux',
  templateUrl: './travaux.component.html',
  styleUrls: ['./travaux.component.css']
})
export class TravauxComponent implements OnInit {
  GroupeId!:number
  travaux: any

  searchedList: any = [];
  inputSearchedValue!: string;
  totalListTravaux: any;

  constructor(private ts: TraveauService ,private authService: AuthService, private downloadFileService: DownloadFileService) { }

  ngOnInit(): void {
    this.GroupeId = this.authService.getEleveGroupeId()
    this.travauxEleve()
  }

  travauxEleve() {
    this.ts.getTravauxEleve(this.GroupeId).subscribe(res => {
      console.log(this.GroupeId)
      console.log(res);
      this.travaux = res;
      this.totalListTravaux= res;

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
      list = this.totalListTravaux;
      this.searchedList = list.filter((x: any) => x.cours.enseignant.matiere.libelle.toUpperCase().includes(this.inputSearchedValue.toUpperCase()));
      this.travaux = this.searchedList;

    } else {
      this.travaux = this.totalListTravaux;
    }
  }



}
