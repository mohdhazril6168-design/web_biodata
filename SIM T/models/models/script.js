// ======================= STORAGE =======================
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

let bookingData = JSON.parse(localStorage.getItem("bookingData")) || [];
let jalurData = JSON.parse(localStorage.getItem("jalurData")) || [];
let relawanData = JSON.parse(localStorage.getItem("relawanData")) || [];
let alatData = JSON.parse(localStorage.getItem("alatData")) || [];
let blogData = JSON.parse(localStorage.getItem("blogData")) || [];

// ======================= INIT =======================
window.onload = () => {
    if (currentUser) {
        showDashboard();
    } else {
        document.getElementById("authPage").classList.remove("hidden");
    }
    renderAll();
};

// ======================= AUTH =======================
function showAuthTab(tab) {
    document.getElementById("loginForm").classList.toggle("hidden", tab !== "login");
    document.getElementById("registerForm").classList.toggle("hidden", tab !== "register");
}

function register() {
    let name = regName.value;
    let email = regEmail.value;
    let pass = regPassword.value;
    let confirm = regConfirm.value;
    let role = regRole.value;

    if (!name || !email || !pass) return alert("Isi semua data!");
    if (pass !== confirm) return alert("Password tidak sama!");

    users.push({ name, email, pass, role });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Berhasil daftar!");
    showAuthTab("login");
}

function login() {
    let email = loginEmail.value;
    let pass = loginPassword.value;

    let user = users.find(u => u.email === email && u.pass === pass);
    if (!user) return alert("Login gagal!");

    currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
    showDashboard();
}

function logout() {
    localStorage.removeItem("currentUser");
    location.reload();
}

// ======================= NAV =======================
function showDashboard() {
    document.getElementById("authPage").classList.add("hidden");
    document.getElementById("dashboardPage").classList.remove("hidden");

    userInfo.style.display = "flex";
    userName.innerText = currentUser.name;
    userRole.innerText = currentUser.role;

    updateStats();
}

function goPage(page) {
    document.querySelectorAll(".container > div").forEach(p => p.classList.add("hidden"));
    document.getElementById(page + "Page").classList.remove("hidden");
    renderAll();
}

// ======================= BOOKING =======================
function saveBooking() {
    let data = {
        id: Date.now(),
        nama: bookingNama.value,
        jalur: bookingJalur.value,
        tanggal: bookingTanggal.value,
        jumlah: bookingJumlah.value,
        status: "Pending"
    };
    bookingData.push(data);
    localStorage.setItem("bookingData", JSON.stringify(bookingData));
    renderBooking();
}

function renderBooking() {
    let list = document.getElementById("bookingList");
    list.innerHTML = "";

    bookingData.forEach(b => {
        list.innerHTML += `
        <tr>
            <td>${b.tanggal}</td>
            <td>${b.nama}</td>
            <td>${b.jalur}</td>
            <td>${b.jumlah}</td>
            <td>${b.status}</td>
            <td>
                <button onclick="deleteBooking(${b.id})">Hapus</button>
            </td>
        </tr>`;
    });
}

function deleteBooking(id) {
    bookingData = bookingData.filter(b => b.id !== id);
    localStorage.setItem("bookingData", JSON.stringify(bookingData));
    renderBooking();
}

// ======================= JALUR =======================
function saveJalur() {
    let data = {
        id: Date.now(),
        nama: jalurNama.value,
        grade: jalurGrade.value,
        lokasi: jalurLokasi.value,
        status: jalurStatus.value
    };
    jalurData.push(data);
    localStorage.setItem("jalurData", JSON.stringify(jalurData));
    renderJalur();
    loadJalurSelect();
}

function renderJalur() {
    let list = document.getElementById("jalurList");
    list.innerHTML = "";

    jalurData.forEach(j => {
        list.innerHTML += `
        <tr>
            <td>${j.nama}</td>
            <td>${j.grade}</td>
            <td>${j.lokasi}</td>
            <td>${j.status}</td>
            <td><button onclick="deleteJalur(${j.id})">Hapus</button></td>
        </tr>`;
    });
}

function deleteJalur(id) {
    jalurData = jalurData.filter(j => j.id !== id);
    localStorage.setItem("jalurData", JSON.stringify(jalurData));
    renderJalur();
}

// ======================= RELAWAN =======================
function saveRelawan() {
    let data = {
        id: Date.now(),
        nama: relawanNama.value,
        hp: relawanHp.value,
        email: relawanEmail.value,
        keahlian: relawanKeahlian.value
    };
    relawanData.push(data);
    localStorage.setItem("relawanData", JSON.stringify(relawanData));
    renderRelawan();
}

function renderRelawan() {
    let list = document.getElementById("relawanList");
    list.innerHTML = "";

    relawanData.forEach(r => {
        list.innerHTML += `
        <tr>
            <td>${r.nama}</td>
            <td>${r.keahlian}</td>
            <td>${r.hp}</td>
            <td>${r.email}</td>
            <td><button onclick="deleteRelawan(${r.id})">Hapus</button></td>
        </tr>`;
    });
}

// ======================= ALAT =======================
function saveAlat() {
    let data = {
        id: Date.now(),
        nama: alatNama.value,
        jumlah: alatJumlah.value,
        kondisi: alatKondisi.value
    };
    alatData.push(data);
    localStorage.setItem("alatData", JSON.stringify(alatData));
    renderAlat();
}

function renderAlat() {
    let list = document.getElementById("alatList");
    list.innerHTML = "";

    alatData.forEach(a => {
        list.innerHTML += `
        <tr>
            <td>${a.nama}</td>
            <td>${a.jumlah}</td>
            <td>${a.kondisi}</td>
            <td><button onclick="deleteAlat(${a.id})">Hapus</button></td>
        </tr>`;
    });
}

// ======================= BLOG =======================
function saveBlog() {
    let data = {
        id: Date.now(),
        judul: blogJudul.value,
        isi: blogIsi.value
    };
    blogData.push(data);
    localStorage.setItem("blogData", JSON.stringify(blogData));
    renderBlog();
}

function renderBlog() {
    let list = document.getElementById("blogList");
    list.innerHTML = "";

    blogData.forEach(b => {
        list.innerHTML += `
        <div class="article-card">
            <h4>${b.judul}</h4>
            <p>${b.isi}</p>
        </div>`;
    });
}

// ======================= UTIL =======================
function loadJalurSelect() {
    let select = document.getElementById("bookingJalur");
    select.innerHTML = "";
    jalurData.forEach(j => {
        select.innerHTML += `<option>${j.nama}</option>`;
    });
}

function updateStats() {
    statBooking.innerText = bookingData.length;
    statJalur.innerText = jalurData.length;
    statAlat.innerText = alatData.length;
    statRelawan.innerText = relawanData.length;
}

function renderAll() {
    renderBooking();
    renderJalur();
    renderRelawan();
    renderAlat();
    renderBlog();
    loadJalurSelect();
    updateStats();
}