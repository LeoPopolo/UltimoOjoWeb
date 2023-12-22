import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss'
})
export class TextareaComponent {
  @Input() rows: number = 10; 
  @Input() cols: number = 30;
  @Input() placeholderValue: string = '';
}
