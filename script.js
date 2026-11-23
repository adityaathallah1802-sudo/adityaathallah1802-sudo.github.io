
const pages = [...document.querySelectorAll(".page")];
const navLinks = [...document.querySelectorAll(".nav-link")];
const indicator = document.getElementById("page-indicator");

let currentPage = 0;
let isAnimating = false;

function showPage(id, updateAddress = true) {
    const nextPage = pages.findIndex(page => page.id === id);

    if (nextPage === -1 || nextPage === currentPage || isAnimating) {
        return;
    }

    isAnimating = true;

    const oldPage = pages[currentPage];
    const newPage = pages[nextPage];

    // Menentukan arah slide
    const direction = nextPage > currentPage ? 1 : -1;

    // Menghapus class lama
    oldPage.classList.remove("active");
    oldPage.classList.add(
        direction > 0 ? "exit-left" : "exit-right"
    );

    newPage.style.transform =
        direction > 0 ? "translateX(100%)" : "translateX(-100%)";

    newPage.style.visibility = "visible";
    newPage.style.pointerEvents = "auto";

    // Menjalankan animasi
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            newPage.classList.add("active");
            newPage.style.transform = "";
        });
    });

    // Mengubah navigasi aktif
    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + id
        );
    });

    // Mengubah indikator halaman
    indicator.textContent =
        `0${nextPage + 1} / 0${pages.length}`;

    // Mengubah alamat URL
    if (updateAddress) {
        history.pushState(null, "", "#" + id);
    }

    currentPage = nextPage;

    // Membersihkan animasi setelah selesai
    setTimeout(() => {
        oldPage.classList.remove("exit-left", "exit-right");
        oldPage.style.visibility = "hidden";
        oldPage.style.pointerEvents = "none";
        isAnimating = false;
    }, 750);
}

// Klik menu navigasi
navLinks.forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();

        const id = this.getAttribute("href").substring(1);
        showPage(id);
    });
});

// Klik tombol yang menuju halaman lain
document.querySelectorAll('a[href^="#"]').forEach(link => {
    if (link.classList.contains("nav-link")) return;

    link.addEventListener("click", function(event) {
        event.preventDefault();

        const id = this.getAttribute("href").substring(1);
        showPage(id);
    });
});

// Tombol back dan forward browser
window.addEventListener("popstate", () => {
    const id = location.hash.substring(1) || "home";
    showPage(id, false);
});

// Membuka halaman berdasarkan alamat URL
window.addEventListener("load", () => {
    const id = location.hash.substring(1) || "home";

    const index = pages.findIndex(page => page.id === id);

    if (index !== -1) {
        pages.forEach((page, i) => {
            page.classList.remove("active", "exit-left", "exit-right");

            if (i === index) {
                page.classList.add("active");
                page.style.visibility = "visible";
                page.style.pointerEvents = "auto";
            } else {
                page.style.visibility = "hidden";
                page.style.pointerEvents = "none";
            }
        });

        currentPage = index;

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + id
            );
        });

        indicator.textContent =
            `0${index + 1} / 0${pages.length}`;
    }
});


/* HOBBY MODAL */

const hobbyData = {
    gaming: {
        title: "Gaming",
        image: "assets/hobbies/gaming.jpg",
        description:
            "Saya menyukai permainan digital sebagai hiburan dan untuk melatih strategi serta konsentrasi."
    },

    programming: {
        title: "Programming",
        image: "assets/hobbies/programming.jpg",
        description:
            "Saya senang mempelajari bahasa pemrograman dan mengembangkan website menggunakan HTML, CSS, JavaScript, dan C++."
    },

    music: {
        title: "Listening Music",
        image: "assets/hobbies/music.jpg",
        description:
            "Mendengarkan musik merupakan salah satu kegiatan favorit saya ketika bersantai dan mengerjakan aktivitas."
    },

    learning: {
        title: "Learning",
        image: "assets/hobbies/learning.jpg",
        description:
            "Saya senang mempelajari pengetahuan dan keterampilan baru untuk meningkatkan kemampuan diri."
    }
};

const hobbyModal = document.getElementById("hobbyModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

// Klik salah satu hobi
document.querySelectorAll(".hobby-card").forEach(card => {

    card.addEventListener("click", () => {

        const hobby = card.dataset.hobby;
        const data = hobbyData[hobby];

        if (!data) return;

        modalImage.src = data.image;
        modalImage.alt = "Kegiatan " + data.title;
        modalTitle.textContent = data.title;
        modalText.textContent = data.description;

        hobbyModal.classList.add("show");
        document.body.style.overflow = "hidden";
    });

});

// Tutup dengan tombol X
closeModal.addEventListener("click", () => {
    hobbyModal.classList.remove("show");
    document.body.style.overflow = "";
});

// Tutup ketika klik area luar popup
hobbyModal.addEventListener("click", event => {

    if (event.target === hobbyModal) {
        hobbyModal.classList.remove("show");
        document.body.style.overflow = "";
    }

});

// Tutup menggunakan tombol Escape
document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        hobbyModal.classList.remove("show");
        document.body.style.overflow = "";
    }

});

