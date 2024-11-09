// src/utils/authUtils.js
import { auth } from '../firebaseConfig';
import { useRouter } from 'vue-router';

const router = useRouter();

export const logoutUser = () => {
  auth.signOut()
    .then(() => {
      // Clear local storage for current user
      localStorage.removeItem('currentUser');
      router.push('/login');  // Redirect to login page
    })
    .catch(error => {
      console.error("Error logging out:", error.message);
    });
};
