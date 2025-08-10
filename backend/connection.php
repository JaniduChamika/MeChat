<?php

class DB
{
      public static $dbms;
      public static function connect()
      {
            if(!isset($dbms)){
                  DB::$dbms = new mysqli("localhost", "root", "@JaniduChamika2001", "mechat", "3306");

            }
         
      }
      public static function iud($q){
            DB::connect();
            DB::$dbms->query($q);
      }
      public static function search($q)
      {
            DB::connect();
            $resultset = DB::$dbms->query($q);
            return $resultset;
      }
}
?>