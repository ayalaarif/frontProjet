import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CoursService } from 'src/app/shared/services/cours.service';
import { DownloadFileService } from 'src/app/shared/services/download-file.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  GroupeId!: number
  cours: any
  searchedList: any = [];
  inputSearchedValue!: string;
  totalListCours: any;


  constructor(private coursService: CoursService, private authService: AuthService, private downloadFileService: DownloadFileService) { }

  ngOnInit(): void {
    this.GroupeId = this.authService.getEleveGroupeId()
    this.coursEleve();
  }

  coursEleve() {
    this.coursService.coursEleve(this.GroupeId).subscribe(res => {
      console.log(this.GroupeId)
      console.log(res);
      this.cours = res;
      this.totalListCours= res;

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
