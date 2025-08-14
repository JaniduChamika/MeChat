<?php

class DB
{
      public static $dbms;
      public static function connect()
      {
            if (!isset($dbms)) {
                  DB::$dbms = new mysqli("localhost", "root", "#######", "mechat", "3306");
            }
      }
      public static function iud($q)
      {
            DB::connect();
            DB::$dbms->query($q);
      }
      public static function search($q)
      {
            DB::connect();
            $resultset = DB::$dbms->query($q);
            return $resultset;
      }

      public static function iudParam($q, $params = [])
      {
            DB::connect();
            $stmt = DB::$dbms->prepare($q);
            if (!$stmt) {
                  throw new Exception("SQL prepare failed: " . DB::$dbms->error);
            }

            if (!empty($params)) {
                  // Dynamically build type string: all 's' (string) unless you want custom types
                  $types = str_repeat('s', count($params));
                  $stmt->bind_param($types, ...$params);
            }

            if (!$stmt->execute()) {
                  throw new Exception("SQL execute failed: " . $stmt->error);
            }

      }
}
