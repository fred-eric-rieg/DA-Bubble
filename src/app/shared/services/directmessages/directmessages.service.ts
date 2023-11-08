import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { equalTo, get, getDatabase, limitToLast, orderByChild, push, query, ref } from '@angular/fire/database';


type Members = {
  [key: string]: boolean;
};


@Injectable({
  providedIn: 'root'
})
export class DirectmessagesService {

  constructor() { }

  async getDirectMessages() {
    const auth = getAuth();
    const uid = auth.currentUser?.uid || '';
    const db = getDatabase();
    const dmRef = ref(db, 'directmessages/');
    const dmQuery = query(dmRef, orderByChild('members'), equalTo(uid), limitToLast(20));

    const snapshot = await get(dmRef);
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  }


  async existsDirectMessage(contactId: string) {
    console.log("Checking this guy: ", contactId);
    const auth = getAuth();
    const uid = auth.currentUser?.uid || '';

    const db = getDatabase();
    const dmRef = ref(db, 'directmessages/');

    const snapshot = await get(dmRef);
    let result = null

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const dm = childSnapshot.val();
        if (dm.members && dm.members[uid] && dm.members[contactId]) {
          console.log("Found a direct message: ", snapshot.val());
          result = snapshot.val();
          return snapshot.val();
        }
      });
    } else {
      console.log("No data available");
    }
    return result;
  }


  async createDirectMessageChannel(contact: string) {
    const auth = getAuth();
    let user = auth.currentUser?.uid || '';
    if (!user) {
      throw new Error('No user is currently logged in.');
    }

    const db = getDatabase();
    const dmRef = ref(db, 'directmessages/');

    const dmMembers: Members = {};
    dmMembers[user] = true;
    dmMembers[contact] = true;

    const dm = {
      members: dmMembers,
      timestamp: Date.now()
    }

    let key = await push(dmRef, dm);

    return key.key;
  }
}
