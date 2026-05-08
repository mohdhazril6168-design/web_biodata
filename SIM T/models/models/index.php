<?php include 'koneksi.php'; ?>

<!DOCTYPE html>
<html>
<head>
    <title>SIM-T | Daftar Jalur</title>
    <style>
        body { font-family: sans-serif; margin: 40px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: #f4f4f4; }
        .status-open { color: green; font-weight: bold; }
        .status-closed { color: red; font-weight: bold; }
    </style>
</head>
<body>
    <h1>Daftar Jalur Tebing (SIM-T)</h1>
    
    <table>
        <tr>
            <th>Nama Jalur</th>
            <th>Grade</th>
            <th>Lokasi</th>
            <th>Status</th>
        </tr>
        
        <?php
        $query = mysqli_query($conn, "SELECT * FROM jalur");
        while($data = mysqli_fetch_array($query)) {
            echo "<tr>";
            echo "<td>" . $data['nama'] . "</td>";
            echo "<td>" . $data['grade'] . "</td>";
            echo "<td>" . $data['lokasi'] . "</td>";
            echo "<td><span class='status-" . $data['status'] . "'>" . $data['status'] . "</span></td>";
            echo "</tr>";
        }
        ?>
    </table>
</body>
</html>