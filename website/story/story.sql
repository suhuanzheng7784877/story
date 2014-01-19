/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50535
Source Host           : localhost:3306
Source Database       : story

Target Server Type    : MYSQL
Target Server Version : 50535
File Encoding         : 65001

Date: 2014-01-22 10:09:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adminname` varchar(40) DEFAULT NULL,
  `logindate` datetime DEFAULT NULL,
  `password` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING HASH,
  KEY `adminname` (`adminname`,`password`) USING HASH
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `authorUserId` int(11) DEFAULT NULL,
  `content` longtext,
  `date` datetime DEFAULT NULL,
  `isPass` varchar(1) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING BTREE,
  KEY `authorUserId` (`authorUserId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for articlecomment
-- ----------------------------
DROP TABLE IF EXISTS `articlecomment`;
CREATE TABLE `articlecomment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `articleId` int(11) DEFAULT NULL,
  `commentMessage` varchar(200) DEFAULT NULL,
  `commentUserId` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING BTREE,
  KEY `articleId` (`articleId`) USING HASH,
  KEY `commentUserId` (`commentUserId`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for invitation
-- ----------------------------
DROP TABLE IF EXISTS `invitation`;
CREATE TABLE `invitation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(10000) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `topicId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING BTREE,
  KEY `userId` (`userId`) USING HASH,
  KEY `topicId` (`topicId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for invitationcomment
-- ----------------------------
DROP TABLE IF EXISTS `invitationcomment`;
CREATE TABLE `invitationcomment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commentMessage` varchar(200) DEFAULT NULL,
  `commentUserId` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `invitationId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING HASH,
  KEY `invitationId` (`invitationId`) USING HASH,
  KEY `commentUserId` (`commentUserId`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `newtitlepic` varchar(450) DEFAULT NULL,
  `newscontent` longtext,
  `newstypeId` int(11) DEFAULT NULL,
  `shrotmessage` varchar(100) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=10794 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for newscomment
-- ----------------------------
DROP TABLE IF EXISTS `newscomment`;
CREATE TABLE `newscomment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commentMessage` varchar(200) DEFAULT NULL,
  `commentUserId` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `newsId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING BTREE,
  KEY `newsId` (`newsId`) USING HASH,
  KEY `commentUserId` (`commentUserId`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for newstype
-- ----------------------------
DROP TABLE IF EXISTS `newstype`;
CREATE TABLE `newstype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeTitle` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for person
-- ----------------------------
DROP TABLE IF EXISTS `person`;
CREATE TABLE `person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mark` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for shortmessage
-- ----------------------------
DROP TABLE IF EXISTS `shortmessage`;
CREATE TABLE `shortmessage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `isread` tinyint(1) DEFAULT NULL,
  `message` varchar(50) DEFAULT NULL,
  `sendUserId` int(11) DEFAULT NULL,
  `title` varchar(20) DEFAULT NULL,
  `toUserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `toUserId` (`toUserId`) USING BTREE,
  KEY `isread` (`isread`,`toUserId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6001 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for storymp3
-- ----------------------------
DROP TABLE IF EXISTS `storymp3`;
CREATE TABLE `storymp3` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `downloadcount` int(11) DEFAULT NULL,
  `message` longtext,
  `mp3url` varchar(450) DEFAULT NULL,
  `needscore` int(11) DEFAULT NULL,
  `title` varchar(30) DEFAULT NULL,
  `titlepicurl` varchar(450) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for storymp3downloadusers
-- ----------------------------
DROP TABLE IF EXISTS `storymp3downloadusers`;
CREATE TABLE `storymp3downloadusers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `storymp3id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tableinfo
-- ----------------------------
DROP TABLE IF EXISTS `tableinfo`;
CREATE TABLE `tableinfo` (
  `tablename` varchar(40) NOT NULL,
  `datacount` int(10) DEFAULT NULL,
  PRIMARY KEY (`tablename`),
  UNIQUE KEY `tablename` (`tablename`) USING HASH
) ENGINE=MEMORY DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for test
-- ----------------------------
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test` (
  `a` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for topic
-- ----------------------------
DROP TABLE IF EXISTS `topic`;
CREATE TABLE `topic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `topicintro` varchar(40) DEFAULT NULL,
  `topictitle` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `regdate` date DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING BTREE,
  UNIQUE KEY `UK_cvaouvg098letvsfxhk5282j9` (`userid`),
  KEY `FK36EBCBA84E0C89` (`userid`),
  KEY `name` (`name`) USING BTREE,
  CONSTRAINT `FK36EBCBA84E0C89` FOREIGN KEY (`userid`) REFERENCES `userinfo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3004 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `birthday` date DEFAULT NULL,
  `experience` int(11) DEFAULT NULL,
  `nickname` varchar(30) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `shortmotto` varchar(40) DEFAULT NULL,
  `userheadurl` varchar(100) DEFAULT NULL,
  `usermess` varchar(400) DEFAULT NULL,
  `website` varchar(150) DEFAULT NULL,
  `work` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3004 DEFAULT CHARSET=utf8;
