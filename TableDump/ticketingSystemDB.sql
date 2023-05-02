DROP TABLE IF EXISTS `ticketingsystem`.`theme`;
DROP TABLE IF EXISTS `ticketingsystem`.`templatefieldtag`;
DROP TABLE IF EXISTS `ticketingsystem`.`template`;
DROP TABLE IF EXISTS `ticketingsystem`.`ticketfieldtag`;
DROP TABLE IF EXISTS `ticketingsystem`.`fieldtag`;
DROP TABLE IF EXISTS `ticketingsystem`.`ticket`;
DROP TABLE IF EXISTS `ticketingsystem`.`user`;
DROP FUNCTION IF EXISTS `ticketingsystem`.`getTicketsByUserID`;
-- option to add ZEROFILL before NOT NULL
DROP DATABASE IF EXISTS `ticketingsystem`;
CREATE DATABASE `ticketingsystem`;
CREATE TABLE `ticketingsystem`.`user` (
  `userID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `fName` VARCHAR(45) NULL,
  `lName` VARCHAR(45) NULL,
  `role` ENUM('admin', 'employee', 'user', 'inactive') NOT NULL DEFAULT 'user',
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`userID`));
 

  CREATE TABLE `ticketingsystem`.`ticket` (
  `ticketID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `userID` INT UNSIGNED NULL,
  `title` VARCHAR(45) NOT NULL,
  `info` MEDIUMTEXT NULL,
  `status` ENUM('active', 'complete') NOT NULL DEFAULT 'active',
  `dateCreated` DATE NOT NULL,
  `dateModified` DATE NOT NULL,
  `dateCompleted` DATE NULL,
  PRIMARY KEY (`ticketID`),
  INDEX `userID_idx` (`userID` ASC) VISIBLE,
  CONSTRAINT `userID`
    FOREIGN KEY (`userID`)
    REFERENCES `ticketingsystem`.`user` (`userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


CREATE TABLE `ticketingsystem`.`fieldtag` (
  `fieldtagID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `field` VARCHAR(45) NULL,
  `tag` VARCHAR(45) NULL,
  `valid` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`fieldtagID`))
COMMENT = 'valid is a boolean, with 1 being valid and 0 being invalid';

CREATE TABLE `ticketingsystem`.`ticketfieldtag` (
  `ticketID` INT UNSIGNED NOT NULL,
  `fieldtagID` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`ticketID`, `fieldtagID`),
  INDEX `fieldtagID_idx` (`fieldtagID` ASC) VISIBLE,
  CONSTRAINT `ticketID`
    FOREIGN KEY (`ticketID`)
    REFERENCES `ticketingsystem`.`ticket` (`ticketID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fieldtagID`
    FOREIGN KEY (`fieldtagID`)
    REFERENCES `ticketingsystem`.`fieldtag` (`fieldtagID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


CREATE TABLE `ticketingsystem`.`theme` (
  `themeID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL DEFAULT 'TicketingSystem',
  `primaryColor` VARCHAR(20) NOT NULL DEFAULT "cyan",
  `secondaryColor` VARCHAR(20) NOT NULL DEFAULT "yellow",
  `textColor` VARCHAR(20) NOT NULL DEFAULT "black",
  `image` VARCHAR(45) BINARY NULL,
  PRIMARY KEY (`themeID`))
COMMENT = '16711680 is red, 65535 is blue';


CREATE TABLE `ticketingsystem`.`template` (
  `templateID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `info` VARCHAR(45) NULL,
  PRIMARY KEY (`templateID`));


CREATE TABLE `ticketingsystem`.`templatefieldtag` (
  `templateID` INT UNSIGNED NOT NULL,
  `fieldtagID` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`templateID`, `fieldtagID`),
  INDEX `fieldtagID_idx` (`fieldtagID` ASC) VISIBLE,
  CONSTRAINT `template`
    FOREIGN KEY (`templateID`)
    REFERENCES `ticketingsystem`.`template` (`templateID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fieldtag`
    FOREIGN KEY (`fieldtagID`)
    REFERENCES `ticketingsystem`.`fieldtag` (`fieldtagID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

DELIMITER //
CREATE FUNCTION `ticketingsystem`.`getTicketsByUserID`
(
	currTicketID INT UNSIGNED,
    currUserID INT UNSIGNED,
	gotUserID INT UNSIGNED
) RETURNS INT UNSIGNED
BEGIN
	DECLARE gotUserRole INT;
	SELECT `role` INTO gotUserRole FROM `ticketingsystem`.`user` WHERE userID = gotUserID;
    IF gotUserID = currUserID
		THEN RETURN currTicketID;
	ELSEIF gotUserRole > 2
		THEN RETURN NULL;
	ELSE 
		RETURN currTicketID;
	END IF;
END; //
DELIMITER ;

INSERT INTO `ticketingsystem`.`user` (`fName`, `lName`, `role`, `username`, `password`) VALUES ('setFirstName', 'setLastName', 'admin', 'admin', 'password');
INSERT INTO `ticketingsystem`.`user` (`fName`, `lName`, `role`, `username`, `password`) VALUES ('Bob', 'McGee', 'employee', 'bmcgee', 'password');
INSERT INTO `ticketingsystem`.`user` (`fName`, `lName`, `role`, `username`, `password`) VALUES ('Bill', 'McGoo', 'user', 'bmcgoo', 'password');

INSERT INTO `ticketingsystem`.`ticket` (`userID`, `title`, `info`, `status`, `dateCreated`, `dateModified`, `dateCompleted`) VALUES (2, "Test Ticket", "This is ticket information", "active", "2020-01-21", "2020-01-21", null);
INSERT INTO `ticketingsystem`.`ticket` (`userID`, `title`, `info`, `status`, `dateCreated`, `dateModified`, `dateCompleted`) VALUES (3, "Test Ticket2", "This is ticket information2", "complete", "2020-02-21", "2020-03-21", "2021-01-01");

INSERT INTO `ticketingsystem`.`fieldtag` (`field`, `tag`) VALUES ("Computer Type", "PC");
INSERT INTO `ticketingsystem`.`fieldtag` (`field`, `tag`) VALUES ("Computer Type", "Mac");
INSERT INTO `ticketingsystem`.`fieldtag` (`field`, `tag`) VALUES ("Building", "Darwin");
INSERT INTO `ticketingsystem`.`fieldtag` (`field`, `tag`) VALUES ("Building", "Ives");
INSERT INTO `ticketingsystem`.`fieldtag` (`field`, `tag`) VALUES ("Issue", "Internet is down");
INSERT INTO `ticketingsystem`.`fieldtag` (`field`, `tag`) VALUES ("Issue", "Liquid Spill");

INSERT INTO `ticketingsystem`.`ticketfieldtag` (`ticketID`, `fieldtagID`) VALUES (1, 1);
INSERT INTO `ticketingsystem`.`ticketfieldtag` (`ticketID`, `fieldtagID`) VALUES (1, 3);
INSERT INTO `ticketingsystem`.`ticketfieldtag` (`ticketID`, `fieldtagID`) VALUES (2, 2);
INSERT INTO `ticketingsystem`.`ticketfieldtag` (`ticketID`, `fieldtagID`) VALUES (2, 4);

INSERT INTO `ticketingsystem`.`theme` (`name`, `primaryColor`, `secondaryColor`, `textColor`) VALUES ("Default", "2011a2", "55e7ff", "ff34b3");

INSERT INTO `ticketingsystem`.`template` (`title`, `info`) VALUES ("This is a template", "explain how this template is useful");
INSERT INTO `ticketingsystem`.`template` (`title`, `info`) VALUES ("This is a template2", "explain how this template is useful");

INSERT INTO `ticketingsystem`.`templatefieldtag` (`templateID`, `fieldtagID`) VALUES (1, 1);
INSERT INTO `ticketingsystem`.`templatefieldtag` (`templateID`, `fieldtagID`) VALUES (1, 4);
INSERT INTO `ticketingsystem`.`templatefieldtag` (`templateID`, `fieldtagID`) VALUES (1, 6);
INSERT INTO `ticketingsystem`.`templatefieldtag` (`templateID`, `fieldtagID`) VALUES (2, 2);
-- This is an example of a call to validate a user and password
SELECT * FROM `ticketingsystem`.`user` A WHERE A.`username` = 'admin' AND A.`password` = 'password'; 

-- This is an example of a ticket instance with fields and user name
SELECT A.`ticketID`, A.`title`, D.`fName`, D.`lName`, C.`field`, C.`tag`, A.`info`, A.`dateCreated`, A.`dateModified` FROM `ticketingsystem`.`ticket` A INNER JOIN `ticketingsystem`.`ticketfieldtag` B ON A.`ticketID` = B.`ticketID` INNER JOIN `ticketingsystem`.`fieldtag` C ON B.`fieldtagID` = C.`fieldtagID` INNER JOIN `ticketingsystem`.`user` D ON A.userID = D.userID WHERE A.`ticketID` = 1;
-- This is an example of a ticket template with 3 tags, title, and info on the template
SELECT * FROM `ticketingsystem`.`template` A INNER JOIN `ticketingsystem`.`templatefieldtag` B ON A.`templateID` = B.`templateID` INNER JOIN `ticketingsystem`.`fieldtag` C ON B.`fieldtagID` = C.`fieldtagID` WHERE B.`templateID` = 1;
-- this is an example of getting all the tickets a user can see based on their userID (the number 2 in the subquerry right below is the userID that should be a ? in the actual call)
SELECT * FROM `ticketingsystem`.`ticket` A INNER JOIN (SELECT `ticketingsystem`.`getTicketsByUserID`(`ticketID`, `userID`, 2) as ticketID FROM `ticketingsystem`.`ticket`) B ON A.`ticketID` = B.`ticketID`;


