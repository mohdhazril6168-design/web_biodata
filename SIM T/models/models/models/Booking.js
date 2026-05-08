const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    nama: String,
    jalur: String,
    tanggal: String,
    jumlah: Number,
    status: String
});

module.exports = mongoose.model("Booking", bookingSchema);