<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "sim_t_db"; // Nama database yang kita buat tadi

$conn = mysqli_connect($host, $user, $pass, $db);

// Cek koneksi
if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}

// Jika berhasil, tidak akan muncul tulisan apa-apa (bersih)
?>