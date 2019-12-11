import { Component, OnInit, Input, Provider, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';



@Component({
  selector: 'app-ng-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgSelectComponent),
      multi: true
    }
  ],
  templateUrl: './ng-select.component.html',
  styleUrls: ['./ng-select.component.css']
})
export class NgSelectComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder: string;
  @Input() arrayList: any[] = [];
  @Input() bindLabel: string;
  @Input() bindValue: any;
  @Input() disabled = false;

  itemSelect: any = {};
  bufferSize = 50;
  numberOfItemsFromEndBeforeFetchingMore = 10;
  loading = false;
  arrayBuffer: any[] = [];
  onChange: any = (_: any) => { };
  onTouch: any = () => { };
  val = "";

  constructor() {

  }

  ngOnInit() {
    console.log(this.bindLabel);
    console.log('arrayList: ' + this.arrayList.length);
    this.arrayBuffer = this.arrayList.slice(0, this.bufferSize);
  }

  onScrollToEnd() {
    this.fetchMore();
  }

  onScroll({ end }) {
    if (this.loading || this.arrayBuffer.length === this.arrayList.length) {
      return;
    }

    if (end + this.numberOfItemsFromEndBeforeFetchingMore >= this.arrayBuffer.length) {
      this.fetchMore();
    }
  }


  private fetchMore() {
    const len = this.arrayBuffer.length;
    const more = this.arrayList.slice(len, this.bufferSize + len);
    this.loading = true;
    // using timeout here to simulate backend API delay
    setTimeout(() => {
      this.loading = false;
      this.arrayBuffer = this.arrayBuffer.concat(more);
    }, 200);
  }

  writeValue(value: any) {
    if (value) {
      this.val = value;
      this.onChange(value);
      this.onTouch(value);
    } else {
      this.val = '';
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn
  }
}
