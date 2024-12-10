// storage.js
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";
import app from './app.js';
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Inisialisasi Firebase Storage
const storage = getStorage(app);
const db = getFirestore(app);

// Fungsi untuk meng-upload file gambar profil
export async function uploadProfilePhoto(file, userId) {
    // Membuat referensi ke lokasi file di Firebase Storage
    const fileRef = ref(storage, 'profile_pictures/' + file.name);

    try {
        // Mengunggah file ke Firebase Storage
        const snapshot = await uploadBytes(fileRef, file);
        console.log("Upload berhasil:", snapshot);

        // Mendapatkan URL file yang telah di-upload
        const downloadURL = await getDownloadURL(fileRef);
        console.log("URL Gambar Profil:", downloadURL);

        // Simpan URL gambar ke Firestore pada data pengguna
        await updateUserProfilePhoto(userId, downloadURL);

        return downloadURL;
    } catch (error) {
        console.error("Upload file gagal:", error);
        throw error;
    }
}

// Fungsi untuk memperbarui URL gambar profil di Firestore
async function updateUserProfilePhoto(userId, photoURL) {
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
