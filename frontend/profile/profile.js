import { getAuth, onAuthStateChanged, updatePassword } from "https://www.gstatic.com/firebasejs/9.1.0/auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.1.0/storage.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.1.0/firestore.js";
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
      document.getElementById('profile-photo').src = userData.photoURL || "default-profile.png";
    } else {
      console.log("User data not found in Firestore.");
    }
  } else {
    window.location.replace("login.html");
  }
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

// Logout functionality
document.getElementById("logout-button").addEventListener("click", () => {
  auth.signOut().then(() => {
    window.location.replace("login.html");
  }).catch((error) => {
    console.error("Error signing out: ", error);
  });
});
