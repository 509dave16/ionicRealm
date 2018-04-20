import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [
    IonicModule,
    // DirectivesModule,
    // PipesModule,
    CommonModule,
    FormsModule,
  ],
  exports: [
    IonicModule,
    // DirectivesModule,
    // PipesModule,
    CommonModule,
    FormsModule,
  ]
})
export class SharedModule {}
