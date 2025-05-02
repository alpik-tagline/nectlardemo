import auth from '@react-native-firebase/auth';

export const register = async (email, password) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    console.log('Registration failed:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.log('Login failed:', error);
    throw error;
  }
};

export const getUserEmail = () => {
  const user = auth().currentUser;
  if (user) {
    return user.email;
  } else {
    console.log('No user is signed in');
    return null;
  }
};

export const listenAuthState = onUserChanged => {
  return auth().onAuthStateChanged(user => {
    if (user) {
      console.log('User is signed in:', user.email);
      onUserChanged(user);
    } else {
      console.log('No user signed in');
      onUserChanged(null);
    }
  });
};
