var KEYS={USERS:'simt_users',CURRENT_USER:'simt_current_user',BOOKINGS:'simt_bookings',JALUR:'simt_jalur',RELAWAN:'simt_relawan',ALAT:'simt_alat',BLOG:'simt_blog',HISTORY:'simt_history'};
function generateId(){return Date.now().toString(36)+Math.random().toString(36).substr(2,5);}
function formatDate(ds){if(!ds)return'-';var d=new Date(ds);return d.toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'});}
function todayStr(){return new Date().toISOString().split('T')[0];}
function getStorage(key,def){try{var d=localStorage.getItem(key);return d?JSON.parse(d):(def!==undefined?def:[]);}catch(e){return def!==undefined?def:[];}}
function setStorage(key,val){localStorage.setItem(key,JSON.stringify(val));}
function showToast(msg,type){var c=document.getElementById('toast-container');var t=document.createElement('div');t.className='toast '+(type||'success');t.textContent=msg;c.appendChild(t);setTimeout(function(){t.remove();},3000);}
function confirmDelete(cb){if(confirm('Yakin ingin menghapus data ini?'))cb();}

var PAGES=['authPage','dashboardPage','bookingPage','historyPage','jalurPage','relawanPage','alatPage','blogPage'];
function hideAllPages(){PAGES.forEach(function(id){var el=document.getElementById(id);if(el)el.classList.add('hidden');});}
function showPage(pageId){hideAllPages();var el=document.getElementById(pageId);if(el)el.classList.remove('hidden');window.scrollTo(0,0);}
function goPage(page){var map={dashboard:'dashboardPage',booking:'bookingPage',history:'historyPage',jalur:'jalurPage',relawan:'relawanPage',alat:'alatPage',blog:'blogPage'};showPage(map[page]);if(page==='dashboard')updateDashboard();if(page==='booking'){renderBooking();populateJalurSelect();}if(page==='history')renderHistory();if(page==='jalur')renderJalur();if(page==='relawan')renderRelawan();if(page==='alat')renderAlat();if(page==='blog')renderBlog();}

function showAuthTab(tab){var tabs=document.querySelectorAll('.auth-tab');if(tab==='login'){tabs[0].classList.add('active');tabs[1].classList.remove('active');document.getElementById('loginForm').classList.remove('hidden');document.getElementById('registerForm').classList.add('hidden');}else{tabs[0].classList.remove('active');tabs[1].classList.add('active');document.getElementById('loginForm').classList.add('hidden');document.getElementById('registerForm').classList.remove('hidden');}}
function login(){var email=document.getElementById('loginEmail').value.trim();var password=document.getElementById('loginPassword').value;if(!email||!password){showToast('Email dan password wajib diisi','error');return;}var users=getStorage(KEYS.USERS);var user=null;for(var i=0;i<users.length;i++){if(users[i].email===email&&users[i].password===password){user=users[i];break;}}if(!user){showToast('Email atau password salah','error');return;}setStorage(KEYS.CURRENT_USER,user);showToast('Login berhasil!');initApp();}
function register(){var name=document.getElementById('regName').value.trim();var email=document.getElementById('regEmail').value.trim();var password=document.getElementById('regPassword').value;var confirm=document.getElementById('regConfirm').value;var role=document.getElementById('regRole').value;if(!name||!email||!password||!confirm){showToast('Semua field wajib diisi','error');return;}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){showToast('Format email tidak valid','error');return;}if(password.length<6){showToast('Password minimal 6 karakter','error');return;}if(password!==confirm){showToast('Password tidak cocok','error');return;}var users=getStorage(KEYS.USERS);for(var i=0;i<users.length;i++){if(users[i].email===email){showToast('Email sudah terdaftar','error');return;}}var newUser={id:generateId(),name:name,email:email,password:password,role:role};users.push(newUser);setStorage(KEYS.USERS,users);setStorage(KEYS.CURRENT_USER,newUser);showToast('Pendaftaran berhasil!');initApp();}
function logout(){localStorage.removeItem(KEYS.CURRENT_USER);showToast('Logout berhasil');initApp();}

function getCurrentUser(){return getStorage(KEYS.CURRENT_USER,null);}
function updateUIForRole(){var user=getCurrentUser();var adminOnly=document.querySelectorAll('.admin-only');if(user&&user.role==='admin'){adminOnly.forEach(function(el){el.classList.remove('hidden');});}else{adminOnly.forEach(function(el){el.classList.add('hidden');});}var userInfo=document.getElementById('userInfo');if(user){userInfo.style.display='flex';document.getElementById('userName').textContent=user.name;document.getElementById('userRole').textContent=user.role;}else{userInfo.style.display='none';}}

    var d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

function todayStr() {
    return new Date().toISOString().split('T')[0];
}

function getStorage(key, def) {
    try {
        var data = localStorage.getItem(key);
        return data ? JSON.parse(data) : (def !== undefined ? def : []);
    } catch (e) {
        return (def !== undefined ? def : []);
    }
}

function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function showToast(msg, type) {
    var c = document.getElementById('toast-container');
    var t = document.createElement('div');
    t.className = 'toast ' + (type || 'success');
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(function() { t.remove(); }, 3000);
}

function confirmDelete(cb) {
    if (confirm('Yakin ingin menghapus data ini?')) cb();
}

// NAVIGATION
var PAGES = ['authPage','dashboardPage','bookingPage','historyPage','jalurPage','relawanPage','alatPage','blogPage'];

function hideAllPages() {
    PAGES.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
}

function showPage(pageId) {
    hideAllPages();
    var el = document.getElementById(pageId);
    if (el) el.classList.remove('hidden');
    window.scrollTo(0, 0);
}

function goPage(page) {
    var map = { dashboard:'dashboardPage', booking:'bookingPage', history:'historyPage', jalur:'jalurPage', relawan:'relawanPage', alat:'alatPage', blog:'blogPage' };
    showPage(map[page]);
    if (page === 'dashboard') updateDashboard();
    if (page === 'booking') { renderBooking(); populateJalurSelect(); }
    if (page === 'history') renderHistory();
    if (page === 'jalur') renderJalur();
    if (page === 'relawan') renderRelawan();
    if (page === 'alat') renderAlat();
    if (page === 'blog') renderBlog();
}

// AUTH
function showAuthTab(tab) {
    var tabs = document.querySelectorAll('.auth-tab');
    if (tab === 'login') {
        tabs[0].classList.add('active'); tabs[1].classList.remove('active');
        document.getElementById('loginForm').classList.remove('hidden');
        document.getElementById('registerForm').classList.add('hidden');
    } else {
        tabs[0].classList.remove('active'); tabs[1].classList.add('active');
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('registerForm').classList.remove('hidden');
    }
}

function login() {
    var email = document.getElementById('loginEmail').value.trim();
    var password = document.getElementById('loginPassword').value;
    if (!email || !password) { showToast('Email dan password wajib diisi', 'error'); return; }

    var users = getStorage(KEYS.USERS);
    var user = null;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) { user = users[i]; break; }
    }
    if (!user) { showToast('Email atau password salah', 'error'); return; }

    setStorage(KEYS.CURRENT_USER, user);
    showToast('Login berhasil!');
    initApp();
}

function register() {
    var name = document.getElementById('regName').value.trim();
    var email = document.getElementById('regEmail').value.trim();
    var password = document.getElementById('regPassword').value;
    var confirm = document.getElementById('regConfirm').value;
    var role = document.getElementById('regRole').value;

    if (!name || !email || !password || !confirm) { showToast('Semua field wajib diisi', 'error'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast('Format email tidak valid', 'error'); return; }
    if (password.length < 6) { showToast('Password minimal 6 karakter', 'error'); return; }
    if (password !== confirm) { showToast('Password tidak cocok', 'error'); return; }

    var users = getStorage(KEYS.USERS);
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) { showToast('Email sudah terdaftar', 'error'); return; }
    }

    var newUser = { id: generateId(), name: name, email: email, password: password, role: role };
    users.push(newUser);
    setStorage(KEYS.USERS, users);
    setStorage(KEYS.CURRENT_USER, newUser);
    showToast('Pendaftaran berhasil!');
    initApp();
}

function logout() {
    localStorage.removeItem(KEYS.CURRENT_USER);
    showToast('Logout berhasil');
    initApp();
}

// ROLE & UI
function getCurrentUser() {
    return getStorage(KEYS.CURRENT_USER, null);
}

function updateUIForRole() {
    var user = getCurrentUser();
    var adminOnly = document.querySelectorAll('.admin-only');
    if (user && user.role === 'admin') {
        adminOnly.forEach(function(el) { el.classList.remove('hidden'); });
    } else {
        adminOnly.forEach(function(el) { el.classList.add('hidden'); });
    }
    var userInfo = document.getElementById('userInfo');
    if (user) {
        userInfo.style.display = 'flex';
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userRole').textContent = user.role;
    } else {
        userInfo.style.display = 'none';
    }
}

// DASHBOARD
function updateDashboard() {
    var user = getCurrentUser();
    if (!user) return;
    var bookings = getStorage(KEYS.BOOKINGS);
    var jalur = getStorage(KEYS.JALUR);
    var alat = getStorage(KEYS.ALAT);
    var relawan = getStorage(KEYS.RELAWAN);

    var myBookings = user.role === 'admin' ? bookings : bookings.filter(function(b) { return b.userId === user.id; });
    var activeBookings = 0;
    for (var i = 0; i < myBookings.length; i++) {
        if (myBookings[i].status !== 'Selesai' && myBookings[i].status !== 'Ditolak') activeBookings++;
    }
    var openJalur = 0;
    for (var j = 0; j < jalur.length; j++) { if (jalur[j].status === 'Buka') openJalur++; }
    var availableAlat = 0;
    for (var k = 0; k < alat.length; k++) { availableAlat += (alat[k].tersedia || 0); }

    document.getElementById('statBooking').textContent = activeBookings;
    document.getElementById('statJalur').textContent = openJalur;
    document.getElementById('statAlat').textContent = availableAlat;
    document.getElementById('statRelawan').textContent = relawan.length;
    renderRecentActivity();
}

function renderRecentActivity() {
    var user = getCurrentUser();
    var bookings = getStorage(KEYS.BOOKINGS);
    var myBookings = user.role === 'admin' ? bookings : bookings.filter(function(b) { return b.userId === user.id; });
    var recent = myBookings.slice(-5).reverse();
    var tbody = document.getElementById('recentActivity');
    if (recent.length === 0) { tbody.innerHTML = '<tr><td colspan="3">Belum ada aktivitas</td></tr>'; return; }
    var html = '';
    for (var i = 0; i < recent.length; i++) {
        var b = recent[i];
        html += '<tr><td>' + formatDate(b.tanggal) + '</td><td>Booking ' + b.jalur + '</td><td><span class="badge badge-' + getStatusClass(b.status) + '">' + b.status + '</span></td></tr>';
    }
    tbody.innerHTML = html;
}

function getStatusClass(status) {
    var map = { 'Pending': 'pending', 'Diterima': 'approved', 'Ditolak': 'rejected', 'Selesai': 'completed' };
    return map[status] || 'pending';
}

// HISTORY
function addHistory(type, description, status) {
    var history = getStorage(KEYS.HISTORY);
    history.unshift({ id: generateId(), type: type, description: description, status: status, date: new Date().toISOString() });
    if (history.length > 200) history = history.slice(0, 200);
    setStorage(KEYS.HISTORY, history);
}

function renderHistory() {
    var monthFilter = document.getElementById('filterHistoryMonth').value;
    var typeFilter = document.getElementById('filterHistoryType').value;
    var history = getStorage(KEYS.HISTORY);
    if (monthFilter) history = history.filter(function(h) { return h.date.indexOf(monthFilter) === 0; });
    if (typeFilter) history = history.filter(function(h) { return h.type === typeFilter; });
    var tbody = document.getElementById('historyList');
    if (history.length === 0) { tbody.innerHTML = '<tr><td colspan="4">Tidak ada riwayat</td></tr>'; return; }
    var html = '';
    for (var i = 0; i < history.length; i++) {
        var h = history[i];
        html += '<tr><td>' + formatDate(h.date.split('T')[0]) + '</td><td>' + (h.type === 'booking' ? 'Booking' : 'Peminjaman Alat') + '</td><td>' + h.description + '</td><td><span class="badge badge-' + getStatusClass(h.status) + '">' + h.status + '</span></td></tr>';
    }
    tbody.innerHTML = html;
}

// BOOKING
function populateJalurSelect() {
    var select = document.getElementById('bookingJalur');
    var jalur = getStorage(KEYS.JALUR).filter(function(j) { return j.status === 'Buka'; });
    if (jalur.length === 0) { select.innerHTML = '<option value="">Tidak ada jalur tersedia</option>'; return; }
    var html = '';
    for (var i = 0; i < jalur.length; i++) {
        html += '<option value="' + jalur[i].nama + '">' + jalur[i].nama + ' (' + jalur[i].grade + ')</option>';
    }
    select.innerHTML = html;
}

function resetBookingForm() {
    document.getElementById('bookingId').value = '';
    document.getElementById('bookingNama').value = '';
    document.getElementById('bookingJalur').value = '';
    document.getElementById('bookingTanggal').value = '';
    document.getElementById('bookingJumlah').value = 1;
    document.getElementById('bookingCatatan').value = '';
}

function saveBooking() {
    var user = getCurrentUser();
    if (!user) return;
    var id = document.getElementById('bookingId').value;
    var nama = document.getElementById('bookingNama').value.trim();
    var jalur = document.getElementById('bookingJalur').value;
    var tanggal = document.getElementById('bookingTanggal').value;
    var jumlah = parseInt(document.getElementById('bookingJumlah').value) || 1;
    var catatan = document.getElementById('bookingCatatan').value.trim();

    if (!nama || !jalur || !tanggal) { showToast('Nama, jalur, dan tanggal wajib diisi', 'error'); return; }
    if (tanggal < todayStr()) { showToast('Tanggal tidak boleh di masa lalu', 'error'); return; }

    var bookings = getStorage(KEYS.BOOKINGS);
    if (id) {
        for (var i = 0; i < bookings.length; i++) {
            if (bookings[i].id === id) {
                bookings[i] = Object.assign({}, bookings[i], { nama: nama, jalur: jalur, tanggal: tanggal, jumlah: jumlah, catatan: catatan });
                showToast('Booking diperbarui');
                addHistory('booking', 'Update booking ' + jalur, bookings[i].status);
                break;
            }
        }
    } else {
        bookings.push({ id: generateId(), userId: user.id, nama: nama, jalur: jalur, tanggal: tanggal, jumlah: jumlah, catatan: catatan, status: 'Pending' });
        showToast('Booking berhasil dibuat');
        addHistory('booking', 'Booking ' + jalur, 'Pending');
    }
    setStorage(KEYS.BOOKINGS, bookings);
    resetBookingForm();
    renderBooking();
}

function renderBooking() {
    var user = getCurrentUser();
    var search = document.getElementById('searchBooking').value.toLowerCase();
    var statusFilter = document.getElementById('filterBookingStatus').value;
    var bookings = getStorage(KEYS.BOOKINGS);
    if (user.role !== 'admin') bookings = bookings.filter(function(b) { return b.userId === user.id; });
    if (search) bookings = bookings.filter(function(b) { return b.nama.toLowerCase().indexOf(search) !== -1 || b.jalur.toLowerCase().indexOf(search) !== -1; });
    if (statusFilter) bookings = bookings.filter(function(b) { return b.status === statusFilter; });

    var tbody = document.getElementById('bookingList');
    if (bookings.length === 0) { tbody.innerHTML = '<tr><td colspan="6">Tidak ada data</td></tr>'; return; }
    var html = '';
    for (var i = 0; i < bookings.length; i++) {
        var b = bookings[i];
        var adminActions = '';
        if (user.role === 'admin') {
            if (b.status === 'Pending') adminActions += '<button class="btn-sm btn-accent" onclick="updateBookingStatus(\'' + b.id + '\', \'Diterima\')">Terima</button> <button class="btn-sm btn-danger" onclick="updateBookingStatus(\'' + b.id + '\', \'Ditolak\')">Tolak</button> ';
            if (b.status === 'Diterima') adminActions += '<button class="btn-sm btn-primary" onclick="updateBookingStatus(\'' + b.id + '\', \'Selesai\')">Selesai</button> ';
        }
        html += '<tr><td>' + formatDate(b.tanggal) + '</td><td>' + b.nama + '</td><td>' + b.jalur + '</td><td>' + b.jumlah + '</td><td><span class="badge badge-' + getStatusClass(b.status) + '">' + b.status + '</span></td><td>' + adminActions + '<button class="btn-sm btn-warning" onclick="editBooking(\'' + b.id + '\')">Edit</button> <button class="btn-sm btn-danger" onclick="deleteBooking(\'' + b.id + '\')">Hapus</button></td></tr>';
    }
    tbody.innerHTML = html;
}

function editBooking(id) {
    var bookings = getStorage(KEYS.BOOKINGS);
    var b = null;
    for (var i = 0; i < bookings.length; i++) { if (bookings[i].id === id) { b = bookings[i]; break; } }
    if (!b) return;
    document.getElementById('bookingId').value = b.id;
    document.getElementById('bookingNama').value = b.nama;
    document.getElementById('bookingJalur').value = b.jalur;
    document.getElementById('bookingTanggal').value = b.tanggal;
    document.getElementById('bookingJumlah').value = b.jumlah;
    document.get
