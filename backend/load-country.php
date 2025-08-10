<?php
require "connection.php";

$table = DB::search("SELECT * FROM country ORDER BY `name` ASC");
$countryArray = array();

for ($i = 0; $i < $table->num_rows; $i++) {
      $row = $table->fetch_assoc();
      $countryObj = new stdClass();
      $countryObj->value = $row["id"];
      $countryObj->label = $row["name"];
      $countryArray[$i] = $countryObj;
}



$responseJSON = json_encode($countryArray);
echo ($responseJSON);
