import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TraveauService } from 'src/app/shared/services/traveau.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DownloadFileService } from 'src/app/shared/services/download-file.service';
@Component({
  selector: 'app-list-traveaux',
  templateUrl: './list-traveaux.component.html',
  styleUrls: ['./list-traveaux.component.css']
})
export class ListTraveauxComponent implements OnInit {
  traveaux: any;
  id!: number
  showMsg: boolean = false;
  blob: any

  searchedList: any = [];
  inputSearchedValue!: string;
  totalListTravaux: any;
  @ViewChild('closeModal') closeModal!: ElementRef;


  constructor(private traveauService: TraveauService, private authService: AuthService, private downloadFileService: DownloadFileService) { }

  ngOnInit(): void {
    this.id = this.authService.getEnseignantId()
    this.listTraveaux();
  }

  listTraveaux() {
    this.traveauService.getTraveaux(this.id).subscribe(res => {
      console.log(res);
      this.traveaux = res;
      this.totalListTravaux = res
    })
  }

  cancel() {
    this.closeModal.nativeElement.click();
  }

  idTravau!: number;
  onClick(event: number) {
    this.idTravau = event
    console.log("idTravau:", this.idTravau)
  }

  deleteTraveau(id: number) {
    this.traveauService.supprimerTraveau(id).subscribe(res => {
      this.listTraveaux();
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
      list = this.totalListTravaux;
      this.searchedList = list.filter((x: any) => x.libelle.toUpperCase().includes(this.inputSearchedValue.toUpperCase()));
      this.traveaux = this.searchedList;

    } else {
      this.traveaux = this.totalListTravaux;
    }
  }



}
