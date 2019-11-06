import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WeatherService} from '../../services/weather/weather.service';
import {Subscription} from 'rxjs';
import { stat } from 'fs';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  
  city: string;
  state: string;
  temp: number;
  hum: number;
  wind: number;

  today: string;

  day1Name: string;
  day1State: string;
  day1Temp: number;


  day2Name: string;
  day2State: string;
  day2Temp: number;

  day3Name: string;
  day3State: string;
  day3Temp: number;

  day4Name: string;
  day4State: string;
  day4Temp: number;

  day5Name: string;
  day5State: string;
  day5Temp: number;

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  sub5: Subscription;

  constructor(public activeRouter: ActivatedRoute, public weather: WeatherService) {
  }



  ngOnInit() {

    const todayNumInWeek = new Date().getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.today=days[todayNumInWeek];
    
    this.activeRouter.paramMap.subscribe((rout: any)=>{
      
      this.city = rout.prams.city;
      this.sub1 = this.weather.getWeatherState(this.city).subscribe((stat)=> this.state=stat);
      this.sub2 = this.weather.getCurrentTemp(this.city).subscribe((temperature) => this.temp = temperature);
      this.sub3 = this.weather.getCurrentHum(this.city).subscribe((humidity) => this.hum = humidity);
      this.sub4 = this.weather.getCurrentWind(this.city).subscribe((windspeed) => this.wind = windspeed);
      this.sub5 = this.weather.getForcast(this.city).subscribe((data: any)=>{
        console.log(data);
        for(let i=0; i<data.length; i++){
          const date = new Date(data[i].dt_text).getDay();
          console.log(days[date]);
          // === checks whether the type and values of the two operands are equal or not.
          if(((date === todayNumInWeek+1) || (todayNumInWeek === 6 && date === 0)) && !this.day1Name){
            this.day1Name = days[date];
            this.day1State = data[i].weather[0].main;
            this.day1Temp = Math.round(data[i].main.temp);
          
          } else if (!!this.day1Name && !this.day2Name && days[date] !== this.day1Name) {
            this.day2Name = days[date];
            this.day2State = data[i].weather[0].main;
            this.day2Temp = Math.round(data[i].main.temp);

          } else if (!! this.day1Name && !this.day3Name && days[date] !== this.day2Name){
            this.day3Name = days[date];
            this.day3State = data[i].weather[0].main;
            this.day3Temp = Math.round(data[i].main.temp);
          
          } else if ( !!this.day3Name && !this.day4Name && days[date] !== this.day3Name){
            this.day3Name = days[date];
            this.day3State = data[i].weather[0].main;
            this.day3Temp = Math.round(data[i].main.temp);
          
          } else if ( !!this.day4Name && !this.day5Name && days[date] !== this.day4Name){
            this.day5Name = days[date];
            this.day5State = data[i].weather[0].main;
            this.day5Temp = Math.round(data[i].main.temp);
          }
        }
      });

    });
  }
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
  
}
