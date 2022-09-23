import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PaisesRoutingModule } from 'src/app/paises/paises-routing.module';
import { SelectorPageComponent } from 'src/app/paises/pages/selector-page/selector-page.component';


@NgModule({
    declarations: [
        SelectorPageComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PaisesRoutingModule,
    ]
})
export class PaisesModule { }
