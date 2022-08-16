import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

async function getData(token) {
  console.log(token);
  const resp = await fetch(
    'https://www.googleapis.com/books/v1/mylibrary/bookshelves/4/volumes?fields=totalItems, items(id, volumeInfo/title, volumeInfo/authors, volumeInfo/publishedDate, volumeInfo/publisher, volumeInfo/industryIdentifiers, volumeInfo/imageLinks)',
    {
      method: 'GET',
      // credentials: 'include',
      headers: {'Authorization': 'Bearer ' + token}

    }
  )
}

export const AuthService = {
    
    login: async () =>{
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/books');
        const auth = getAuth();        

        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            getData(token);
            console.log(token + "from sign in")
            // The signed-in user info.
            const user = result.user;
            console.log(user.displayName);
        }).catch((error) => {
            // Handle Errors here.
            // const errorCode = error.code;
            const errorMessage = error.message;
            // // The email of the user's account used.
            // const email = error.customData.email;
            // // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorMessage);
        })
    },

    logout: async() =>{
        const auth = getAuth();
        await signOut(auth).then(() => {
            // Sign-out successful.
            console.log("signed out");
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    }    
}