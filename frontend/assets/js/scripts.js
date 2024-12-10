// Toggle class active untuk navbar
const navbarNav = document.querySelector(".navbar-nav");
const hamburger = document.querySelector("#menu");

// Ketika menu di klik, toggle navbar
hamburger.onclick = () => {
  navbarNav.classList.toggle("active");
};

// Klik di luar navbar untuk menghilangkan navbar
document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Fungsi untuk memuat halaman berdasarkan parameter page
const pagePaths = {
  'green-cooling': 'green-cooling/index.html',
  'reflective-materials': 'reflective-materials/index.html',
  'water-cooling': 'water-cooling/index.html',
};

function loadPage(page) {
  let pagePath = pagePaths[page];

  if (pagePath) {
    // Memuat konten dari file HTML
    fetch(pagePath)
      .then(response => response.text())
      .then(html => {
        document.querySelector("#content").innerHTML = html;
      })
      .catch(error => console.log("Error loading page:", error));
  } else {
    // Jika halaman tidak ditemukan, scroll ke bagian yang sesuai
    document.querySelector("#" + page)?.scrollIntoView({ behavior: 'smooth' });
  }
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
const searchButton = document.getElementById("searchButton");
if (searchButton) {
  searchButton.addEventListener("click", () => {
    const searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();
    if (searchTerm) {
      // Logika pencarian atau redirect ke hasil pencarian
      alert("Searching for: " + searchTerm);
    } else {
      alert("Please enter a search term.");
    }
  });
}

// Toggle tampilan kolom pencarian
document.getElementById("search").addEventListener("click", (event) => {
  event.preventDefault();
  const searchContainer = document.getElementById("searchContainer");
  searchContainer.style.display = searchContainer.style.display === "none" ? "flex" : "none";
});
