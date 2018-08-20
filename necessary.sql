/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50045
Source Host           : localhost:3306
Source Database       : h51804

Target Server Type    : MYSQL
Target Server Version : 50045
File Encoding         : 65001

Date: 2018-08-17 17:33:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `necessary`
-- ----------------------------
DROP TABLE IF EXISTS `necessary`;
CREATE TABLE `necessary` (
  `id` int(11) NOT NULL auto_increment,
  `phone` int(50) NOT NULL,
  `password` varchar(50) collate utf8_unicode_ci NOT NULL,
  `date` timestamp NULL default CURRENT_TIMESTAMP,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `phone` USING BTREE (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of necessary
-- ----------------------------
INSERT INTO `necessary` VALUES ('1', '139', '123', '2018-08-14 20:53:14');
INSERT INTO `necessary` VALUES ('2', '138', '123', '2018-08-14 21:12:50');
INSERT INTO `necessary` VALUES ('3', '123456', 'abcde', '2018-08-14 21:15:20');
INSERT INTO `necessary` VALUES ('4', '3432432', '123', '2018-08-14 21:20:15');
INSERT INTO `necessary` VALUES ('5', '0', '123456', '2018-08-14 21:35:02');
INSERT INTO `necessary` VALUES ('6', '434553', '6545', '2018-08-14 21:36:56');
INSERT INTO `necessary` VALUES ('7', '2147483647', '213213213', '2018-08-14 21:53:39');
INSERT INTO `necessary` VALUES ('8', '3432423', '324324234234', '2018-08-14 21:55:23');
INSERT INTO `necessary` VALUES ('9', '3432', '32432423423432423432', '2018-08-14 22:00:21');
INSERT INTO `necessary` VALUES ('10', '32432', '324324234234', '2018-08-14 22:00:31');
INSERT INTO `necessary` VALUES ('11', '324324324', '324324', '2018-08-14 22:02:26');
INSERT INTO `necessary` VALUES ('12', '213213213', '21321321312', '2018-08-15 09:09:06');
INSERT INTO `necessary` VALUES ('13', '87978', '2132132131232', '2018-08-15 09:13:10');
