import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-afficher-event',
  templateUrl: './afficher-event.component.html',
  styleUrls: ['./afficher-event.component.css']
})
export class AfficherEventComponent implements OnInit {
  id!: number;
  event!: any;

  constructor(private route: ActivatedRoute, private es:EventService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];

    this.getEventById()
  }

  getEventById(){
    this.es.getEventById(this.id).subscribe(res=>{
      console.log(res);
      this.event= res;

    })

  }

}
