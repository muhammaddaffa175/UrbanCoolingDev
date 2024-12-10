// firestore.js
import { getFirestore, doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import app from './app.js';

// Inisialisasi Firestore
const db = getFirestore(app);

// Fungsi untuk menyimpan data pengguna pertama kali ke Firestore
export async function saveUserData(userId, username, email) {
    try {
        const userRef = doc(db, 'users', userId); // Referensi ke dokumen pengguna di Firestore
        await setDoc(userRef, { // Menyimpan data pengguna baru
            username: username,
            email: email
        });
        console.log("User data saved successfully!");
    } catch (error) {
        console.error("Error saving user data: ", error);
    }
}

// Fungsi untuk memperbarui data pengguna di Firestore
export async function updateUserData(userId, username, email) {
    const userRef = doc(db, 'users', userId);
    try {
        // Menggunakan merge untuk memastikan hanya field yang disebutkan yang diperbarui
        await updateDoc(userRef, {
            username: username,
            email: email
        }, { merge: true });  // Pastikan data lain tidak terhapus
        console.log("User data updated successfully!");
    } catch (error) {
        console.error("Error updating user data: ", error);
    }
}

// Fungsi untuk memperbarui foto profil di Firestore
export async function updateUserProfilePhoto(userId, photoURL) {
    const userRef = doc(db, "users", userId);
    try {
        await updateDoc(userRef, {
            profilePhotoURL: photoURL
        });
        console.log("Profile photo URL updated successfully!");
    } catch (error) {
        console.error("Error updating profile photo URL:", error);
    }
}
