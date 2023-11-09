import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /**
   * This method uploads a file to firebase storage.
   * @param file as jpg, png or jpeg
   * @param path as string
   * @param metadata as type of file eg. image/png
   * @returns 
   */
  async uploadPicture(file: File, path: string, metadata?: any) {
    const storage = getStorage();
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }
}
