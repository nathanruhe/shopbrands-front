import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-ui-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class UiCardComponent {
  @Input() image_url: string = "";
  @Input() name: string = "";
  @Input() description: string = "";
  @Input() price: number = 0;
  @Input() sku: string = "";
  @Input() stock: number = 0;
  @Input() size: string = "M";
  @Input() color: string = "";
  @Input() discount?: number;

  get discountedPrice(): number | null {
    if (!this.discount || this.discount <= 0) return null;
    return +(this.price * (1 - this.discount / 100)).toFixed(2);
  }
}
