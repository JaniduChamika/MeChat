<?php
require "connection.php";
$user = $_POST['user_id'];
$friend = $_POST['friend_id'];


$query = "SELECT `chat`.`id`, `chat`.`message`,`chat`.`date_time`,`chat`.`user_to`,`chat`.`user_from`,`status`.`name` AS `status`,`type`.`name` AS `type` 
 FROM `chat` 
INNER JOIN `type` ON `chat`.`type_id`=`type`.`id` 
INNER JOIN `status` ON `chat`.`status_id`=`status`.`id`
WHERE (`user_from` = '" . $user . "' AND `user_to` = '" . $friend . "') 
OR (`user_from` = '" . $friend . "' AND `user_to` = '" . $user . "') ORDER BY `date_time` ASC";

$table = DB::search($query);
$chatArray = array();


for ($i = 0; $i < $table->num_rows; $i++) {
      $row = $table->fetch_assoc();
      DB::iudParam("UPDATE `chat` SET `status_id` = '1' WHERE chat.`id` = ? AND `user_from` = ?", [$row["id"], $friend]);
      $chatObject = new stdClass();
      $chatObject->id = $row["id"];
      $chatObject->msg = $row["message"];
      // $chatObject->time = $row["date_time"];
      $phpDateTimeObj = strtotime($row["date_time"]);
      $timestr = date("h i a", $phpDateTimeObj);
      $datestr = date("Y/m/d", $phpDateTimeObj);
      $chatObject->time = $timestr;
      $chatObject->date = $datestr;
      $chatObject->type = $row["type"];
      if ($row["user_from"] == $user) {
            $chatObject->side = "right";
      } else {
            $chatObject->side = "left";
      }

      $chatObject->status = $row["status"];
      $chatArray[$i] = $chatObject;
}
$responseJSON = json_encode($chatArray);
echo ($responseJSON);
