<?php
require "connection.php";

$userJsonText = $_POST["userJsonText"];
// $userPhpObject =new stdClass();
$userPhpObject = json_decode($userJsonText);


$table = DB::search("SELECT `user`.`id`,`user`.`name`,`user`.`profile_url` FROM `friends`
INNER JOIN `user` ON `friends`.`freind_id`=`user`.`id` 
WHERE `user_id` = '" . $userPhpObject->id . "'");

$phpResponseArray = array();
for ($x = 0; $x < $table->num_rows; $x++) {
      $phpArrayItemObject = new stdClass();

      $user = $table->fetch_assoc();
      $phpArrayItemObject->image = $user["profile_url"];
      $phpArrayItemObject->name = $user["name"];
      $phpArrayItemObject->id = $user["id"];
      $phpArrayItemObject->online = false;
      $phpArrayItemObject->lastsender = "me";
      $table2 = DB::search("SELECT * FROM `chat` 
      INNER JOIN `status` ON `chat`.`status_id`=`status`.`id`
       WHERE `user_from`='" . $userPhpObject->id . "' AND `user_to`='" . $user["id"] . "' 
    OR 
    `user_from`='" . $user["id"] . "' AND `user_to`='" . $userPhpObject->id . "' 
    ORDER BY `date_time` DESC");
      if ($table2->num_rows == 0) {
            $phpArrayItemObject->message = "Waiting for accept";
            $phpArrayItemObject->time = "";
            $phpArrayItemObject->count = "0";
            $phpArrayItemObject->lastsender = "friend";
      } else {
            //unseen chat count
            $unseenChatCount = 0;
            //first row
            $lastChatRow = $table2->fetch_assoc();
            if ($lastChatRow["status_id"] != 1 && $lastChatRow["user_from"] == $user["id"]) {
                  $unseenChatCount++;
                  $phpArrayItemObject->lastsender = "friend";
            }
            $phpArrayItemObject->status = $lastChatRow["name"];
            $phpArrayItemObject->message = $lastChatRow["message"];

            $phpDateTimeObj = strtotime($lastChatRow["date_time"]);
            $timeStr = date("h i a", $phpDateTimeObj);

            $phpArrayItemObject->time = $timeStr;


            for ($i = 0; $i < $table2->num_rows - 1; $i++) {
                  //other rows
                  $newChatRow = $table2->fetch_assoc();
                  if ($newChatRow["status_id"] != 1 && $newChatRow["user_from"] == $user["id"]) {
                        $unseenChatCount++;
                  }
                  $phpArrayItemObject->friend = $newChatRow["user_from"];
                  $phpArrayItemObject->friend2 = $user["name"];
            }
            $phpArrayItemObject->count = $unseenChatCount;
      }
      array_push($phpResponseArray, $phpArrayItemObject);
}

$jsonResponseText = json_encode($phpResponseArray);
echo ($jsonResponseText);
