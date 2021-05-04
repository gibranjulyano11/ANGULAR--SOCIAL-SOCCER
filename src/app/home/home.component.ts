import { Component} from '@angular/core';
import {ISlider} from '../slider/Islider';
import {SliderData} from '../slider/Islider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'

})
export class HomeComponent {

  public sliderData: ISlider[]= SliderData;

  constructor() { }
}
