import { Component, OnInit, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AbsenceService } from 'src/app/shared/services/absence.service';
import { DisciplineEleves } from 'src/app/shared/models/discipline-eleves.model';
import { NgForm } from '@angular/forms';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';
import { NotificationService } from 'src/app/shared/services/notification.service';


@Component({
  selector: 'app-liste-absences',
  templateUrl: './liste-absences.component.html',
  styleUrls: ['./liste-absences.component.css']
})
export class ListeAbsencesComponent implements OnInit {
  @ViewChild('absenceForm') absenceForm !: NgForm;
  @ViewChildren("checkbox") checkbox!: QueryList<ElementRef>;
  @ViewChild('closeModal') closeModal!: ElementRef;

  types: any = [
    { name: 'Absent(e)', id: 1, selected: false },
    { name: 'Retard', id: 2, selected: false },
  ]

  annee_id!: number
  groupes: any
  seances: any
  eleves: any
  dates: any
  id!: number
  index!: number
  indexType!: number
  eleveAbsence = new DisciplineEleves()
  l!: number
  deleteMsg: boolean = false
  updateMsg: boolean = false
  errorMsg: boolean = false

  update: boolean = false
  select: boolean = false




  data = {
    groupe_id: 0,
    seance_id: 0,
    date: "vide"
  }

  constructor(private authService: AuthService, private gs: GroupeService, private absenceService: AbsenceService, public anneeService: AnneeScolaireService, private notifService: NotificationService) { }


  ngOnInit(): void {
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a = sessionStorage.getItem('annee');
    if (a) {

      this.annee_id = JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.id = this.authService.getEnseignantId()
    this.listGroupes();

  }
  //Retourne la liste des groupes affectés à un enseignant spécifique
  listGroupes() {
    this.gs.listGroupe(this.id, this.annee_id).subscribe(res => {
      this.groupes = res;
      console.log(this.groupes);

    })
  }
  //à chaque fois un groupe est séléctionné,Retourne la liste des seances de l'enseignant affectés à ce groupe
  onSelect() {
    delete this.eleves
    this.l = 0
    this.data.seance_id = 0
    this.data.date = "vide"
    delete this.dates
    this.absenceService.ListSeancesByGroupeId(this.data.groupe_id, this.id).subscribe(res => {
      this.seances = res;
      console.log(this.seances);
    })
  }

  //à chaque fois une seance est séléctionnée,Retourne la liste des dates  de cette seance
  onSelect1() {
    delete this.eleves
    this.l = 0
    this.data.date = "vide"
    this.absenceService.ListDates(this.data.seance_id).subscribe(res => {
      this.dates = res;
      console.log(this.dates);
      console.log(typeof this.dates[0].date)
    })
  }

  //à chaque fois une date est séléctionnée,Retourne la liste des absences  des eleves dans cette date
  onSelect2() {
    console.log(this.data)
    this.ListAbsencesEleves()
  }

  //Retourne la liste des absences  des eleves
  ListAbsencesEleves() {
    this.absenceService.ListAbsencesEleves(this.data).subscribe(res => {
      console.log("res")
      console.log(res)
      this.eleves = res;
      this.l = this.eleves.length
      console.log(this.eleves);
      this.select = true

    })
  }
  annuler() {
    this.index = this.l + 1
    this.update = false
    this.errorMsg = false
    for (var i = 0; i < this.types.length; i++) {
      this.types[i].selected = false

    }



  }
  modifier(absence: any, i: number) {
    console.log(absence)
    this.eleveAbsence.id = absence.id
    this.eleveAbsence.type = absence.type
    this.eleveAbsence.margeRetard = absence.margeRetard
    console.log(this.eleveAbsence)
    this.indexType = this.types.findIndex((element: any) => element.name.toUpperCase() === (this.eleveAbsence.type).toUpperCase());
    this.types[this.indexType].selected = true

    this.index = i
    this.update = true


  }
  selectCheckBox(id: string, name: string) {
    console.log(id)
    console.log(name)
    this.checkbox.forEach(c => {
      if (c.nativeElement.id != id) {

        c.nativeElement.checked = false
        if (name != 'Retard') {
          this.eleveAbsence.margeRetard = ""
        }


        //  this.absenceForm.value[c.nativeElement.name]=false


      } else {
        if (c.nativeElement.checked) {
          this.eleveAbsence.type = name
        } else {
          this.eleveAbsence.type = ""
        }
      }

    });

  }
  //Modifier une note d'un élève.
  modifierAbsence() {
    console.log("type:" + this.eleveAbsence.type)
    if (this.eleveAbsence.type != "") {
      this.errorMsg = false
      this.absenceService.modifierAbsence(this.eleveAbsence.id, this.eleveAbsence).subscribe(res => {
        this.ListAbsencesEleves()
        this.updateMsg = true;
        this.index = this.l + 1
        setTimeout(() => {
          this.updateMsg = false;
        }, 2000)
        this.update = false
        for (var i = 0; i < this.types.length; i++) {
          this.types[i].selected = false

        }
      })
    } else {
      this.errorMsg = true
    }
  }

  cancel() {
    this.closeModal.nativeElement.click();
  }

  idAbsence!: number;
  onClick(event: number) {
    this.idAbsence = event
    console.log("idAbsence:", this.idAbsence)
  }

  supprimerAbsence(id: number) {
    this.absenceService.supprimerAbsence(id).subscribe(res => {
      this.ListAbsencesEleves();
      console.log(res);
      this.closeModal.nativeElement.click();
      this.deleteMsg = true;
      setTimeout(() => {
        this.deleteMsg = false;
      }, 2000)

    })
    // this.notifService.supprimerNotif(id).subscribe(res2 => {
    //   console.log(res2);

    // })
  }



}




