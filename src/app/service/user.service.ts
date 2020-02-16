import { Injectable } from '@angular/core';
import { User } from "../model/user.model";
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCol: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    this.userCol = afs.collection<User>('user')
  }
  
    getAllProjects(): Observable<User[]> {
    return this.afs.collection<User>('user', ref =>
      ref.orderBy('username'))
      .valueChanges()
  }

    update(user: User): Promise<void> {
      return this.userCol.doc(user.userId).update(Object.assign({ }, user));
    }

    save(user: User): Promise<void> {
      user.dateatt = new Date();
      
      return this.userCol.add(Object.assign({ }, user)).then(result => {
        user.userId = result.id
        this.update(user)
      })
    }

    delete(user: User): Promise<void> {
      return this.userCol.doc(user.userId).delete();
    }
  
}
