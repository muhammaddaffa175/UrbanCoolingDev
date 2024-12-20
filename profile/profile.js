import { getAuth, onAuthStateChanged, signOut, updatePassword, } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { updateUserData } from '../assets/js/firestore.js';  // Import updateUserData function from firestore.js
import app from '../assets/js/app.js';  // Firebase sudah diinisialisasi di app.js

const auth = getAuth();
const storage = getStorage();
const db = getFirestore(app);

// Auth state observer
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Fetching user data from Firestore
    const userDocRef = doc(db, "users", user.uid);
    const docSnapshot = await getDoc(userDocRef);
    
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      document.getElementById('profile-username').textContent = userData.username || "Loading...";
      document.getElementById('profile-email').textContent = userData.email || "Loading...";
      // document.getElementById('profile-photo').src = userData.photoURL || "../default-profile.png";
    } else {
      console.log("User data not found in Firestore.");
    }
  } else {
    window.location.replace("../login/index.html");
  }
});

const logoutButton = document.getElementById('logout-button');
// Fungsi Logout
logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
      alert("Logged out successfully!");
      window.location.href = '../index.html';
    }).catch((error) => {
      console.error("Error during logout:", error);
      alert("Error logging out. Please try again.");
    });
  });

// Update profile photo
document.getElementById("show-file-input").addEventListener("click", () => {
  document.getElementById("file-upload-container").style.display = "block";
});

document.getElementById("update-photo-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const file = document.getElementById("profile-photo-upload").files[0];
  if (file) {
    // Validasi jenis file
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      alert("Hanya file gambar yang diperbolehkan!");
      return;
    }
    
    const user = auth.currentUser;
    const storageRef = ref(storage, 'profile_photos/' + user.uid);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (downloadURL) => {
        // Update photoURL in Firestore
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, { photoURL: downloadURL }, { merge: true });

        alert("Foto profil diperbarui!");
        document.getElementById('profile-photo').src = downloadURL;
      });
    });
  }
});

// Update username or email
document.getElementById("update-profile-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const newUsername = document.getElementById("new-username").value;
  const newEmail = document.getElementById("new-email").value;
  
  const user = auth.currentUser;
  
  try {
    // Update the display name (username) in Firebase Authentication
    await user.updateProfile({ displayName: newUsername });

    // Update the email in Firebase Authentication if provided
    if (newEmail) {
      await user.updateEmail(newEmail);
    }
    
    // Update user data in Firestore
    await updateUserData(user.uid, newUsername, newEmail || user.email);  // Use updateUserData function
    
    alert("Profil diperbarui!");
    window.location.reload();  // Reload the page to reflect the changes
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Gagal memperbarui profil. Silakan coba lagi.");
  }
});

// Update password
document.getElementById("update-password-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const newPassword = document.getElementById("new-password").value;

  const user = auth.currentUser;
  updatePassword(user, newPassword).then(() => {
    alert("Kata sandi diperbarui!");
  }).catch((error) => {
    console.error(error);
    alert("Gagal memperbarui kata sandi. Silakan coba lagi.");
  });
});

// Mengambil elemen profile-photo setelah dokumen dimuat
document.addEventListener('DOMContentLoaded', () => {
  const profilePhoto = document.getElementById('profile-photo');
  const showFileInputButton = document.getElementById('show-file-input');
  const fileUploadContainer = document.getElementById('file-upload-container');
  const profilePhotoUploadInput = document.getElementById('profile-photo-upload');

  // Memastikan elemen ada
  if (profilePhoto && showFileInputButton) {
    // Menampilkan input file ketika tombol 'Ganti Foto' diklik
    showFileInputButton.addEventListener('click', () => {
      fileUploadContainer.style.display = 'block';
    });

    // Mengupload gambar baru ketika tombol upload diklik
    document.getElementById('upload-photo').addEventListener('click', () => {
      if (profilePhotoUploadInput.files.length > 0) {
        const file = profilePhotoUploadInput.files[0];
        const user = auth.currentUser;

        if (user) {
          const storageRef = ref(storage, 'profile_photos/' + user.uid);
          
          // Upload gambar ke Firebase Storage
          uploadBytes(storageRef, file).then((snapshot) => {
            // Ambil URL gambar setelah upload berhasil
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              // Update foto profil di Firestore
              const userDocRef = doc(db, "users", user.uid);
              setDoc(userDocRef, { photoURL: downloadURL }, { merge: true })
                .then(() => {
                  // Ganti foto profil di halaman
                  profilePhoto.src = downloadURL;
                  alert('Foto profil diperbarui!');
                })
                .catch((error) => {
                  console.error('Error updating Firestore:', error);
                  alert('Gagal memperbarui foto profil.');
                });
            });
          }).catch((error) => {
            console.error('Error uploading file:', error);
            alert('Gagal mengupload foto.');
          });
        }
      }
    });
  }
});
