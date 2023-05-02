import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
})
export class VerPaisComponent implements OnInit {
  pais!: Country[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) {}

  ngOnInit(): void {
    /**
     * Con ActivatedRoute nos podemos subscribir a cualquier
     * cambio del url...
     */

    /**
     * Esta es una logica un poco complicada ya que requiere de
     * usar subscribe anidado. rxjs nos permite realizar esta
     * misma funcion de una forma mas sencilla (switchMap)
     */

    // this.activatedRoute.params.subscribe(({ id }) => {
    //   console.log(id);
    //   this.paisService.getPaisPorCodigo(id).subscribe((pais) => {
    //     console.log(pais);
    //   });
    // });

    // Usando switchMap de rxjs
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.paisService.getPaisPorCodigo(id)),
      tap(console.log))
      .subscribe(pais => this.pais = pais);
  }
}
