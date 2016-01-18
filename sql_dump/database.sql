CREATE DATABASE  IF NOT EXISTS `rrs_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `rrs_db`;
-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: localhost    Database: rrs_db
-- ------------------------------------------------------
-- Server version	5.6.26-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
    `customerId` INT(11) NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(45) NOT NULL,
    `lastname` VARCHAR(45) NOT NULL,
    `phone` INT(10) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `username` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `address` VARCHAR(100) NOT NULL,
    `zipcode` INT(5) NOT NULL,
    PRIMARY KEY (`customerId`),
    UNIQUE KEY `username_UNIQUE` (`username`)
)  ENGINE=INNODB AUTO_INCREMENT=1133 DEFAULT CHARSET=UTF8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1123,'Evelyn','Fisher',285545693,'efisher0@wikia.com','efisher0','0P0YegW4xua','2 Dapin Point',50418),(1124,'Chris','Duncan',123312834,'cduncan1@prnewswire.com','cduncan1','q42aiTkltLv','62 Sachs Court',27746),(1125,'Linda','Weaver',358868340,'lweaver2@cocolog-nifty.com','lweaver2','uMtqWr6JH','7 Hansons Avenue',93277),(1126,'Joyce','Grant',302224772,'jgrant3@reuters.com','jgrant3','iOekZc','20827 Carpenter Drive',55699),(1127,'Howard','Johnston',528238046,'hjohnston4@yellowpages.com','hjohnston4','D2laFW','8 Hintze Park',79985),(1128,'Robert','Hayes',459969905,'rhayes5@odnoklassniki.ru','rhayes5','yganFJIJDS','37690 Di Loreto Lane',70960),(1129,'Larry','Dean',374973108,'ldean6@tinypic.com','ldean6','IlOTZl','9660 Manufacturers Junction',32486),(1130,'Linda','Green',335252618,'lgreen7@about.me','lgreen7','TQg7p9T9','040 Stuart Road',99675),(1131,'Donna','Fox',509078184,'dfox8@blogspot.com','dfox8','nTwgHSXtJV','7 Waxwing Parkway',96676),(1132,'Diana','Shaw',419084729,'dshaw9@engadget.com','dshaw9','aqPcrO','31 Boyd Center',48882);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owner`
--

DROP TABLE IF EXISTS `owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `owner` (
    `username` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`username`),
    UNIQUE KEY `username_UNIQUE` (`username`),
    UNIQUE KEY `password_UNIQUE` (`password`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owner`
--

LOCK TABLES `owner` WRITE;
/*!40000 ALTER TABLE `owner` DISABLE KEYS */;
INSERT INTO `owner` VALUES ('username','password');
/*!40000 ALTER TABLE `owner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservation` (
    `reservationId` INT(11) NOT NULL AUTO_INCREMENT,
    `customerId` INT(11) DEFAULT NULL,
    `tableId` INT(11) DEFAULT NULL,
    `confirmationCode` INT(6) NOT NULL,
    `capacity` INT(11) NOT NULL,
    `date` DATETIME NOT NULL,
    `status` VARCHAR(45) DEFAULT NULL,
    PRIMARY KEY (`reservationId`),
    UNIQUE KEY `confirmationCode_UNIQUE` (`confirmationCode`)
)  ENGINE=INNODB AUTO_INCREMENT=10 DEFAULT CHARSET=UTF8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (1,1128,1,27104,4,'2015-09-11 18:56:41','Confirm'),(2,1123,6,61661,4,'2015-09-09 16:55:36','Confirm'),(3,1130,10,23769,2,'2015-09-09 00:45:12','Confirm'),(4,1132,5,96546,8,'2015-09-08 13:27:09','Confirm'),(5,1125,5,56874,8,'2015-09-13 04:55:50','WaitList'),(6,1131,3,58850,4,'2015-09-13 07:02:33','Confirm'),(7,999999,3,58100,4,'2015-09-12 07:02:33','Confirm'),(9,999999,NULL,191780,2,'2015-09-07 00:00:00',NULL);
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tables`
--

DROP TABLE IF EXISTS `tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tables` (
    `tableId` INT(11) NOT NULL,
    `seatingCapacity` INT(11) NOT NULL,
    `isOccupied` TINYINT(1) DEFAULT NULL COMMENT '0- Available, 1- booked; 
    Boolean is synonym for TINYINT(1). A value of zero is considered false. Non-zero values are considered true.',
    PRIMARY KEY (`tableId`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8 COMMENT='This table contains information about the tables number, table capacity, last seating of the day, or the status of the tables  present in the restaurant. ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tables`
--

LOCK TABLES `tables` WRITE;
/*!40000 ALTER TABLE `tables` DISABLE KEYS */;
INSERT INTO `tables` VALUES (1,4,1),(2,2,0),(3,4,0),(4,2,1),(5,8,0),(6,4,1),(7,2,1),(8,2,0),(9,4,0),(10,2,0);
/*!40000 ALTER TABLE `tables` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-09-07  4:09:28
