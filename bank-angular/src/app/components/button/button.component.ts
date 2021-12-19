import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input()
  text!: string;// text displayed in button
  @Input()
  color!: string; //color of button
  @Output() btnClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  //if button clicked
  onClick()
  {

    this.btnClick.emit();
  }
}
