import { initializeApp } from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id" // This is optional
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
