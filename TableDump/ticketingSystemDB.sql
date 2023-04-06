DROP TABLE IF EXISTS `ticketingsystem`.`theme`;
DROP TABLE IF EXISTS `ticketingsystem`.`presetfieldtag`;
DROP TABLE IF EXISTS `ticketingsystem`.`preset`;
DROP TABLE IF EXISTS `ticketingsystem`.`ticketfieldtag`;
DROP TABLE IF EXISTS `ticketingsystem`.`fieldtag`;
DROP TABLE IF EXISTS `ticketingsystem`.`ticket`;
DROP TABLE IF EXISTS `ticketingsystem`.`user`;
-- option to add ZEROFILL before NOT NULL to make the ID's 6/7 digits long
CREATE TABLE `ticketingsystem`.`user` (
  `userID` INT UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `fName` VARCHAR(45) NULL,
  `lName` VARCHAR(45) NULL,
  `role` ENUM('admin', 'employee', 'user', 'inactive') NOT NULL DEFAULT 'user',
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`userID`));
  
 
  CREATE TABLE `ticketingsystem`.`ticket` (
  `ticketID` INT UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
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
  `text` VARCHAR(45) NULL,
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
  `primaryColor` INT NOT NULL DEFAULT 16711680,
  `secondaryColor` INT NOT NULL DEFAULT 65535,
  `image` VARCHAR(45) BINARY NULL,
  PRIMARY KEY (`themeID`))
COMMENT = '16711680 is red, 65535 is blue';


CREATE TABLE `ticketingsystem`.`preset` (
  `presetID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `info` VARCHAR(45) NULL,
  PRIMARY KEY (`presetID`));


CREATE TABLE `ticketingsystem`.`presetfieldtag` (
  `presetID` INT UNSIGNED NOT NULL,
  `fieldtagID` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`presetID`, `fieldtagID`),
  INDEX `fieldtagID_idx` (`fieldtagID` ASC) VISIBLE,
  CONSTRAINT `preset`
    FOREIGN KEY (`presetID`)
    REFERENCES `ticketingsystem`.`preset` (`presetID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fieldtag`
    FOREIGN KEY (`fieldtagID`)
    REFERENCES `ticketingsystem`.`fieldtag` (`fieldtagID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

INSERT INTO `ticketingsystem`.`user` (`fName`, `lName`, `role`, `email`, `password`) VALUES ('setFirstName', 'setLastName', 'admin', 'temp@email.com', 'password');
INSERT INTO `ticketingsystem`.`user` (`fName`, `lName`, `role`, `email`, `password`) VALUES ('Bob', 'McGee', 'employee', 'bmcgee@email.com', 'password');
INSERT INTO `ticketingsystem`.`user` (`fName`, `lName`, `role`, `email`, `password`) VALUES ('Bill', 'McGoo', 'user', 'bmcgoo@email.com', 'password');


SELECT * FROM `user`;