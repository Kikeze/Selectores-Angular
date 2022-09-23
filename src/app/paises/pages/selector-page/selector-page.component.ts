import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, tap } from 'rxjs';

import { PaisesService } from 'src/app/paises/services/paises.service';
import { Country } from 'src/app/paises/interfaces/paises.interfaces';


@Component({
    selector: 'app-selector-page',
    templateUrl: 'selector-page.component.html',
    styleUrls: ['selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

    mainForm: FormGroup = this.builder.group({
        region: ["", Validators.required],
        pais: ["", Validators.required],
        frontera: ["", Validators.required]
    });

    regiones: string[] = [];
    paises: Country[] = [];
    fronteras: Country[] = [];

    cargando: boolean = false;

    constructor(
        private builder: FormBuilder,
        private paisesSvc: PaisesService
    ) {
        // Do nothing
    }

    ngOnInit(): void {
        // Muestra las regiones
        this.regiones = this.paisesSvc.getRegiones();

        // Se selecciona una region
        const region = this.mainForm.get("region");

        if( region ) {
            region.valueChanges.pipe(tap(() => this.cargando = true)).subscribe({
                next: (v) => {
                    this.mainForm.get("pais")?.reset("");
                    this.cargaPaises( v );
                },
                error: (e) => {
                    console.error(e);
                },
                complete: () => {
                    console.log("--> Cambio de region terminado");
                }
            });
        }

        // Se selecciona un pais
        const pais = this.mainForm.get("pais");

        if( pais ) {
            pais.valueChanges.pipe(tap(() => this.cargando = true)).subscribe({
                next: (v) => {
                    this.mainForm.get("frontera")?.reset("");
                    this.cargaFronteras( v );
                },
                error: (e) => {
                    console.error(e);
                },
                complete: () => {
                    console.log("--> Cambio de pais terminado");
                }
            });
        }
    }

    cargaPaises(region: string) {
        if( region.length > 0 ) {
            this.paisesSvc.getPaisesPorRegion(region).subscribe({
                next: (v) => {
                    this.paises = v.sort((a,b) => (a.name.common < b.name.common) ? -1 : 0 );
                    setTimeout(() => {this.cargando = false}, 500);
                },
                error: (e) => {
                    console.error(e);
                },
                complete: () => {
                    console.log("--> Consulta de paises terminada");
                }
            });
        }
        else {
            this.paises = [];
            setTimeout(() => {this.cargando = false}, 500);
        }
    }

    cargaFronteras(codigo: string) {
        if( codigo.length > 0) {
            const pais = this.paises.find((f) => f.cca3 === codigo);

            if( pais ) {
                if( pais.borders.length > 0) {
                    this.paisesSvc.getPaisesPorCodigo(pais.borders).subscribe({
                        next: (v) => {
                            this.fronteras = v.sort((a,b) => (a.name.common < b.name.common) ? -1 : 0 );
                            setTimeout(() => {this.cargando = false}, 500);
                        },
                        error: (e) => {
                            console.error(e);
                        },
                        complete: () => {
                            console.log("--> Consulta de fronteras terminada");
                        }
                    });
                }
                else {
                    this.fronteras = [];
                }
            }
        }
        else {
            this.fronteras = [];
            setTimeout(() => {this.cargando = false}, 500);
        }
    }

    guardar() {
        console.log(this.mainForm);
    }

}

