import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-rain-levels-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="metric-card" [ngClass]="{ mobile: mobile == true }">
      <mat-card-header class="pb-3">
        <div class="card-body">
          <img style="width: 60px;" src="../../assets/flood.png" alt="" />
          <div class="box">
            <h4 [ngClass]="{ spacer: !mobile }">LIVELLI PIOGGIA</h4>
            <div class="row main-data">
              <div class="col-md column">
                <p>
                  Evento: <b>{{ event }}</b> mm
                </p>
                <p>
                  Oraria: <b>{{ hourly }}</b> mm
                </p>
                <p>
                  Settimanale: <b>{{ weekly }}</b> mm
                </p>
              </div>
              <div class="col-md column">
                <p>
                  Mensile: <b>{{ monthly }}</b> mm
                </p>
                <p>
                  Annuale: <b>{{ yearly }}</b> mm
                </p>
              </div>
            </div>
          </div>
        </div>
      </mat-card-header>
    </mat-card>
  `,
  styleUrl: './rain-levels-card.component.scss',
})
export class RainLevelsCardComponent implements OnInit, AfterViewInit {
  @Input() event?: any;
  @Input() hourly?: any;
  @Input() weekly?: any;
  @Input() monthly?: any;
  @Input() yearly?: any;

  mobile!: boolean;

  constructor(private responsive: BreakpointObserver) {}

  ngOnInit(): void {
    this.event = this.event != undefined ? this.event : '-';
    this.hourly = this.hourly != undefined ? this.hourly : '-';
    this.weekly = this.weekly != undefined ? this.weekly : '-';
    this.monthly = this.monthly != undefined ? this.monthly : '-';
    this.yearly = this.yearly != undefined ? this.yearly : '-';
  }

  ngAfterViewInit(): void {
    this.responsive
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => {
        this.mobile = result.matches ? true : false;
      });
  }
}
