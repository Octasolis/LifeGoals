import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, deleteDoc, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Meta } from '../models/meta.model';

@Injectable({
  providedIn: 'root'
})
export class MetaServiceService {
  
  constructor(private firestore: Firestore) { }

  // Obtener todas las metas
  getMetas(): Observable<Meta[]> {
    return new Observable((observer) => {
      const metasCollection = collection(this.firestore, 'metas');
      
      const unsubscribe = onSnapshot(metasCollection, (snapshot) => {
        const metas: Meta[] = [];
        snapshot.forEach((doc) => {
          metas.push({
            id: doc.id,
            meta: doc.data()['meta']
          } as Meta);
        });
        observer.next(metas);
      }, (error) => {
        observer.error(error);
      });

      return () => unsubscribe();
    });
  }

  // Agregar una nueva meta
  addMeta(meta: string): Promise<any> {
    const metasCollection = collection(this.firestore, 'metas');
    return addDoc(metasCollection, { meta: meta });
  }

  // Eliminar una meta
  deleteMeta(id: string): Promise<void> {
    const metaDoc = doc(this.firestore, `metas/${id}`);
    return deleteDoc(metaDoc);
  }
}