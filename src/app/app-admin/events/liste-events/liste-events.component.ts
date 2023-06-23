import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-liste-events',
  templateUrl: './liste-events.component.html',
  styleUrls: ['./liste-events.component.css']
})
export class ListeEventsComponent implements OnInit {

  events: any;
  showMsg: boolean = false;
  @ViewChild('closeModal') closeModal!: ElementRef;
  searchedList: any = [];
  inputSearchedValue!: string;
  totalListEvents: any;

  constructor(private es:EventService) { }

  ngOnInit(): void {
    this.getEvents()
  }

  getEvents(){
    this.es.getEvents().subscribe(res => {
      console.log(res);
      this.events = res;
      this.totalListEvents=res;
    })
  }

  cancel() {
    this.closeModal.nativeElement.click();
  }

  idEvent!: number;
  onClick(event: number) {
    this.idEvent = event
    console.log("idEvent:", this.idEvent)
  }

  deleteEvent(id: number) {
    this.es.supprimerEvent(id).subscribe(res => {
      this.getEvents();
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
      list = this.totalListEvents;
      this.searchedList = list.filter((x: any) => x.libelle.toUpperCase().includes(this.inputSearchedValue.toUpperCase()));
      this.events = this.searchedList;

    } else {
      this.events = this.totalListEvents;
    }
  }

  

}
