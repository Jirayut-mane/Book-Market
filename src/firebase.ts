import { initializeApp } from 'firebase/app';
    import { getAuth } from 'firebase/auth';

    const firebaseConfig = {
      apiKey: "AIzaSyCunCDmGh42b9pTBZUfSbJgKaiwrWiWqtg",
      authDomain: "fir-storebook.firebaseapp.com",
      projectId: "fir-storebook",
      storageBucket: "fir-storebook.firebasestorage.app",
      messagingSenderId: "1007373917310",
      appId: "1:1007373917310:web:bf683873469a7007f28c2f"
    };

    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
