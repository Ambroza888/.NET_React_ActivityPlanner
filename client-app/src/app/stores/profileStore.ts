import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Profile } from '../models/profile';
import { store } from './store';

export default class ProfileStore {
  profile: Profile | null = null;
  loadingProfile = false;
  uploading = false;

  constructor() {
    makeAutoObservable(this)
  }

  get isCurrentUser() {
    if (store.userStore.user && this.profile) {
      return store.userStore.user.userName === this.profile.userName;
    }
    return false;
  }

  loadProfile = async (username: string) => {
    this.loadingProfile = true;

    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      })
    } catch (err) {
      console.log(err);
      runInAction(() => this.loadingProfile = false);
    }
  }

  uploadPhoto = async (file: Blob) => {
    this.uploading = true;

    try {
      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        // avoiding warnings about profile | null
        if (this.profile) {
          this.profile.photos?.push(photo);
          if (photo.isMain && store.userStore.user) {
            store.userStore.setImage(photo.url);
            this.profile.image = photo.url;
          }
        }
        this.uploading = false;
      })
    } catch (err) {
      console.log(err);
      runInAction(() => this.uploading = false);
    }
  }
}