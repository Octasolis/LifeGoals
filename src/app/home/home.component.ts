import { Component, OnInit } from '@angular/core';
import { MetaServiceService } from '../services/meta-service.service';
import { Meta } from '../models/meta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  metas: Meta[] = [];
  nuevaMeta: string = '';

  constructor(private metaService: MetaServiceService) { }

  ngOnInit(): void {
    this.cargarMetas();
  }

  cargarMetas(): void {
    this.metaService.getMetas().subscribe((data: Meta[]) => {
      this.metas = data;
    });
  }

  agregarMeta(): void {
    if (this.nuevaMeta.trim()) {
      this.metaService.addMeta(this.nuevaMeta).then(() => {
        this.nuevaMeta = '';
        console.log('Meta agregada exitosamente');
      });
    }
  }

  eliminarMeta(id: string | undefined): void {
    if (id) {
      this.metaService.deleteMeta(id).then(() => {
        console.log('Meta eliminada exitosamente');
      });
    }
  }
}
