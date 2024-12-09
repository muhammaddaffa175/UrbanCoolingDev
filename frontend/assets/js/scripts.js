// Toggle class active untuk navbar
const navbarNav = document.querySelector(".navbar-nav");
// Ketika menu di klik, toggle navbar
document.querySelector("#menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Klik di luar navbar untuk menghilangkan navbar
const hamburger = document.querySelector("#menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Fungsi untuk memuat halaman berdasarkan parameter page
function loadPage(page) {
  let pagePath = '';
  
  // Menyesuaikan dengan halaman yang ada di UrbanCooling
  if (page === 'green-cooling') {
    pagePath = 'green-cooling/index.html'; // Path untuk Green Cooling
  } else if (page === 'reflective-materials') {
    pagePath = 'reflective-materials/index.html'; // Path untuk Reflective Materials
  } else if (page === 'water-cooling') {
    pagePath = 'water-cooling/index.html'; // Path untuk Water Cooling
  } else {
    document.querySelector("#" + page).scrollIntoView({ behavior: 'smooth' });
    return;
  }
  
  // Memuat konten dari file HTML jika halaman ditemukan
  fetch(pagePath)
    .then(response => response.text())
    .then(html => {
        document.querySelector("#content").innerHTML = html;
    })
    .catch(error => console.log("Error loading page:", error));
}

// Event listener untuk perubahan hash di URL
window.addEventListener("hashchange", () => {
  const page = window.location.hash.substring(1) || "home"; // Default ke "home"
  loadPage(page);
});

// Muat halaman awal berdasarkan hash atau default ke 'home'
window.addEventListener("load", () => {
  const page = window.location.hash.substring(1) || "home"; // Default ke "home"
  loadPage(page);
});

// Fungsi pencarian
document.getElementById("search").addEventListener("click", (event) => {
  event.preventDefault();
  const searchContainer = document.getElementById("searchContainer");
  searchContainer.style.display = searchContainer.style.display === "none" ? "flex" : "none";
});

// Event listener untuk tombol pencarian
document.getElementById("searchButton").addEventListener("click", () => {
  const searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();
  
  if (searchTerm) {
    // Logika pencarian atau redirect ke hasil pencarian
    alert("Searching for: " + searchTerm);
  }
});
