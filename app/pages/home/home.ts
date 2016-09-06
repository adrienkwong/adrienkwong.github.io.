import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ModalController} from 'ionic-angular';
import {HistoryPage} from '../history/history';
import {PlayerModel} from '../../providers/player-model/player-model';
import {Data} from '../../providers/data/data'

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  public matches: any;
  public betting: any;
  public rows: any;
  public stupidMatches: any;

  constructor(private navCtrl: NavController, private modalController: ModalController, public dataService: Data) {}

  ionViewLoaded(){
      this.dataService.getBettingData().then((data) => {
        console.log("ORIGINAL DATA: ", data);
        this.returnBettingData(data);
      });


      this.dataService.getMatchesData().then((data) => {
          console.log("MATCHES DATA: ", data);
            this.returnMatchData(data);
          
        });
  }

  returnMatchData(matches){

    console.log("I'm get this in homepage:", matches);
    this.matches = matches;
    console.log(matches);
    this.stupidMatches = this.matches;
  }

  returnBettingData(betting){

    console.log("I'm get this in homepage:", betting);
    this.betting = betting;
    console.log(this.betting);
    this.rows = this.betting

  }

  createRows(){
    //each row should be an object, consists of that better's name, history + actual score of each match, HAD, CRS, PTS

    console.log(this.rows, "in createRows")


    //adding actual scores into each better/row
    for (var better in this.rows){

      this.rows[better].HAD = 0;
      this.rows[better].CRS = 0

      if(this.rows[better].history.match1){

        this.rows[better].history.match1.ActualHS = this.stupidMatches[0].HS;
        this.rows[better].history.match1.ActualAS = this.stupidMatches[0].AS;
      }

      if(this.rows[better].history.match2){

        this.rows[better].history.match2.ActualHS = this.stupidMatches[1].HS;
        this.rows[better].history.match2.ActualAS = this.stupidMatches[1].AS;
      }

      if(this.rows[better].history.match3){

        this.rows[better].history.match3.ActualHS = this.stupidMatches[2].HS;
        this.rows[better].history.match3.ActualAS = this.stupidMatches[2].AS;
      }

      if(this.rows[better].history.match4){

        this.rows[better].history.match4.ActualHS = this.stupidMatches[3].HS;
        this.rows[better].history.match4.ActualAS = this.stupidMatches[3].AS;
      }

      if(this.rows[better].history.match5){

        this.rows[better].history.match5.ActualHS = this.stupidMatches[4].HS;
        this.rows[better].history.match5.ActualAS = this.stupidMatches[4].AS;
      }

      if(this.rows[better].history.match6){

        this.rows[better].history.match6.ActualHS = this.stupidMatches[5].HS;
        this.rows[better].history.match6.ActualAS = this.stupidMatches[5].AS;
      }

      if(this.rows[better].history.match7){

        this.rows[better].history.match7.ActualHS = this.stupidMatches[6].HS;
        this.rows[better].history.match7.ActualAS = this.stupidMatches[6].AS;
      }

      if(this.rows[better].history.match8){

        this.rows[better].history.match8.ActualHS = this.stupidMatches[7].HS;
        this.rows[better].history.match8.ActualAS = this.stupidMatches[7].AS;
      }

    //loop through each player's history, calculate and add HAD, CRS, PTS

    for (var bet in this.rows[better].history){

        //console.log("this is working at least.");
        //console.log("this is the HS", this.rows[better].history[bet].HS)

        if((this.rows[better].history[bet].HS ==  this.rows[better].history[bet].ActualHS) && (this.rows[better].history[bet].AS ==  this.rows[better].history[bet].ActualAS)){
          //CRS+1, HAD+1
          this.rows[better].HAD += 1;
          this.rows[better].CRS += 1

        }

        else if(
        ((this.rows[better].history[bet].HS > this.rows[better].history[bet].AS) && (this.rows[better].history[bet].ActualHS > this.rows[better].history[bet].ActualAS)) ||
        ((this.rows[better].history[bet].HS < this.rows[better].history[bet].AS) && (this.rows[better].history[bet].ActualHS < this.rows[better].history[bet].ActualAS)) ||
        ((this.rows[better].history[bet].HS == this.rows[better].history[bet].AS) && (this.rows[better].history[bet].ActualHS == this.rows[better].history[bet].ActualAS))
        ){
          this.rows[better].HAD += 1;
          //console.log("HAD Correct!")
        }

        else {
          //console.log("all lose!")
        }

      }

    console.log("HAD:",this.rows[better].HAD);
    console.log("CRS:",this.rows[better].CRS)
    }

    console.log(this.rows, "in createRows AFTER adding")

  }

  

  presentModal(better) {

  	let modal = this.modalController.create(HistoryPage, {
      better: better
    });

  	modal.present();
    
  }



};
