// Mengatur toggle untuk navbar
const navbarNav = document.querySelector(".navbar-nav");
const hamburger = document.querySelector("#menu");

// Ketika menu di klik, toggle navbar
hamburger.onclick = () => {
  navbarNav.classList.toggle("active");
};

// Menutup navbar saat mengubah ukuran layar
window.addEventListener("resize", () => {
  if (window.innerWidth > 758) {
    navbarNav.classList.remove("active");
  }
});

// Klik di luar navbar untuk menutupnya
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Konfigurasi path halaman
const pagePaths = {
  "green-cooling": "green-cooling/index.html",
  "reflective-materials": "reflective-materials/index.html",
  "water-cooling": "water-cooling/index.html",
};

// Fungsi untuk memuat halaman berdasarkan parameter page
function loadPage(page) {
  let pagePath = pagePaths[page];

  if (pagePath) {
    fetch(pagePath)
      .then((response) => response.text())
      .then((html) => {
        document.querySelector("#content").innerHTML = html;
      })
      .catch((error) => console.error("Error loading page:", error));
  } else {
    document
      .querySelector("#" + page)
      ?.scrollIntoView({ behavior: "smooth" });
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
    const searchTerm = document
      .getElementById("searchInput")
      .value.trim()
      .toLowerCase();
    if (searchTerm) {
      alert("Searching for: " + searchTerm);
    } else {
      alert("Please enter a search term.");
    }
  });
}

// Toggle tampilan kolom pencarian
const searchIcon = document.getElementById("search");
if (searchIcon) {
  searchIcon.addEventListener("click", (event) => {
    event.preventDefault();
    const searchContainer = document.getElementById("searchContainer");
    searchContainer.style.display =
      searchContainer.style.display === "none" ? "flex" : "none";
  });
}

// Spesifik untuk Green Cooling
function setupGreenCoolingInteractions() {
  const greenCoolingButtons = document.querySelectorAll(".green-cooling-btn");

  greenCoolingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      alert("Green Cooling action triggered!");
    });
  });
}

// Inisialisasi khusus saat memuat halaman Green Cooling
if (window.location.hash.substring(1) === "green-cooling") {
  setupGreenCoolingInteractions();
}

// Data untuk kartu Green Cooling
const greenCoolingCards = [
    {
      title: "Penanaman Pohon",
      description:
        "Pohon memberikan keteduhan dan menyerap panas, membantu mengurangi efek pulau panas perkotaan.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Atap Hijau",
      description:
        "Atap hijau membantu mengisolasi bangunan, mengurangi penggunaan energi, dan menambah ruang hijau di kota.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Dinding Hidup",
      description:
        "Dinding yang ditumbuhi tanaman membantu mengurangi panas dan meningkatkan kualitas udara.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Kolam Reflektif",
      description:
        "Kolam reflektif membantu mengurangi suhu dengan memanfaatkan air sebagai media pendingin alami.",
      image: "https://via.placeholder.com/300x200",
    },
  ];
  
  // Fungsi untuk membuat kartu
  function createCard(cardData) {
    // Membuat elemen card
    const card = document.createElement("div");
    card.className = "card";
  
    // Membuat elemen gambar
    const img = document.createElement("img");
    img.src = cardData.image;
    img.alt = cardData.title;
  
    // Membuat elemen judul
    const title = document.createElement("h3");
    title.textContent = cardData.title;
  
    // Membuat elemen deskripsi
    const description = document.createElement("p");
    description.textContent = cardData.description;
  
    // Menyusun elemen ke dalam card
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
  
    return card;
  }
  
  // Fungsi untuk merender semua kartu
  function renderCards() {
    const cardsContainer = document.querySelector(".cards");
  
    if (cardsContainer) {
      greenCoolingCards.forEach((cardData) => {
        const card = createCard(cardData);
        cardsContainer.appendChild(card);
      });
    } else {
      console.error("Container untuk kartu tidak ditemukan!");
    }
  }
  
  // Memanggil fungsi renderCards saat halaman selesai dimuat
  document.addEventListener("DOMContentLoaded", renderCards);
  