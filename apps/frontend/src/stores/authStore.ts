import { makeAutoObservable } from 'mobx';

class AuthStore {
  user: { username: string; id: string } | null = null;
  accessToken: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadUserFromSessionStorage();
  }

  // Check if the user is authenticated
  isUserAuthenticated() {
    return this.accessToken !== null && this.user !== null;
  }

  // Login and store full user payload and token
  login(payload: { username: string; id: string }, accessToken: string) {
    this.user = payload;
    this.accessToken = accessToken;
    sessionStorage.setItem('user', JSON.stringify(this.user));
    sessionStorage.setItem('token', accessToken);
  }

  // Logout
  logout() {
    this.user = null;
    this.accessToken = null;
    sessionStorage.clear();
  }

  // Load user and token from sessionStorage
  private loadUserFromSessionStorage() {
    const storedUser = sessionStorage.getItem('user');
    const storedToken = sessionStorage.getItem('token');
    if (storedUser && storedToken) {
      this.user = JSON.parse(storedUser);
      this.accessToken = storedToken;
    }
  }
}

export default AuthStore;
