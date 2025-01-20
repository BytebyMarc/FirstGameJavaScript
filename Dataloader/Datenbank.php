<?php
//$servername = "localhost";
$servername = "w01888c0.kasserver.com";

$username = "d04289fa";
$password = "sccvEnNZ7PayvpswVhH7"; // Passwort der Datenbank
$dbname = "d04289fa";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verbindung überprüfen
if ($conn->connect_error) {
    die(json_encode(['error' => 'Verbindung fehlgeschlagen: ' . $conn->connect_error]));
}

// Anfrage verarbeiten
$input = json_decode(file_get_contents('php://input'), true);
//$ID_Question = $conn->real_escape_string($input['ID_Question']);
$ID_Question = 1;

$sql = "SELECT * FROM QuestionAnswer WHERE ID_Question = '$ID_Question'";
$result = $conn->query($sql);


if ($result && $result->num_rows > 0){
    header('Content-Type: application/json');

    $data = $result->fetch_assoc();

    $data = array_map(function ($value) {
        return $value === null ? '' : $value;
    }, $data);

    $data = array_map(function ($value) {
        if (is_string($value) && !mb_check_encoding($value, 'UTF-8')) {
            return utf8_encode($value);
        }
        return $value;
    }, $data);
    echo json_encode($data);
    //var_dump($data);
    exit;
    // Debugging: Rohdaten anzeigen
    //var_dump($row);

    // JSON-Ausgabe
//    echo json_encode([
//        'ID_Question' => $row['ID_Question'],
//        'Categorie' => $row['Categorie'],
//        'Question' => $row['Question'],
//        'Answer_1' => $row['Answer_1'],
//        'Answer_2' => $row['Answer_2'],
//        'Answer_3' => $row['Answer_3'],
//        'Answer_4' => $row['Answer_4'],
//        'CorrectAnswer' => $row['CorrectAnswer']
//    ]);

} else {
    echo json_encode(['error' => 'Keine Ergebnisse gefunden']);
}

$conn->close();

