import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsUtils } from '../../../utils/form-utils';
@Component({
  selector: 'create-podium',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-podium.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePodiumComponent {
  private fb = inject(FormBuilder);
  formUtils = FormsUtils;

  myForm: FormGroup = this.fb.group({
   name: ['', [Validators.required, Validators.minLength(3)]],     //validadeores sincronos -- validadores asincronos
   termAndConditions: [false, [Validators.requiredTrue]]


 })

 onSave(){

 if(this.myForm.invalid) {
   this.myForm.markAllAsTouched();
   return;
 }

 console.log(this.myForm.value);

}



}
