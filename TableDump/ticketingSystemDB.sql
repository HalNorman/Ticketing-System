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

-- CREATE TABLE `ticketingsystem`.`usermodticket` (
-- 	`userID` INT UNSIGNED NOT NULL,
-- 	`ticketID` INT UNSIGNED NOT NULL,
--    `modified` DATE NOT NULL,
--    PRIMARY KEY (`userID`)
-- )


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
  `primaryColor` VARCHAR(20) NOT NULL DEFAULT "2011a2", 
  `secondaryColor` VARCHAR(20) NOT NULL DEFAULT "55e7ff", 
  `textColor` VARCHAR(20) NOT NULL DEFAULT "ff34b3",
  `backgroundColor` VARCHAR(20) NOT NULL DEFAULT "ffffff",
  PRIMARY KEY (`themeID`))
COMMENT = '16711680 is red, 65535 is blue';


CREATE TABLE `ticketingsystem`.`template` (
  `templateID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `info` TINYTEXT NULL,
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

INSERT INTO `ticketingsystem`.`user` (`fName`, `lName`, `role`, `username`, `password`) VALUES ('admin', ' ', 'admin', 'admin', 'password');
INSERT INTO `ticketingsystem`.`theme` (`name`, `primaryColor`, `secondaryColor`, `textColor`,`backgroundColor`) VALUES ("Default", "2011a2", "55e7ff", "ff34b3","ffffff");

-- Rest of the inserts are used for the demo
INSERT INTO `ticketingsystem`.`user` (`fName`, `lName`, `role`, `username`, `password`) VALUES ('Bob', 'McGee', 'employee', 'bmcgee', 'password');
INSERT INTO `ticketingsystem`.`user` (`fName`, `lName`, `role`, `username`, `password`) VALUES ('Bill', 'McGoo', 'user', 'bmcgoo', 'password');
INSERT INTO `ticketingsystem`.`user` (`fName`, `lName`, `role`, `username`, `password`) VALUES ('Bic', 'Michell', 'user', 'bMichell', 'password');
INSERT INTO `ticketingsystem`.`user` (`fName`, `lName`, `role`, `username`, `password`) VALUES ('Alice', 'Match', 'employee', 'aMatch', 'password');

INSERT INTO `ticketingsystem`.`ticket` (`userID`, `title`, `info`, `status`, `dateCreated`, `dateModified`, `dateCompleted`) VALUES (3, "Broken Washing Machine", "I have been using the whirlpool washing machine that came with the appartment, and it has worked wonderfully up to now. After putting a load into the machine yesterday, I came back to water spewing out of the machine and covering the floor. The water leaked down and seems to be going through the floor.", "active", "2023-01-21", "2023-01-21", null);
INSERT INTO `ticketingsystem`.`ticket` (`userID`, `title`, `info`, `status`, `dateCreated`, `dateModified`, `dateCompleted`) VALUES (4, "Internet down by bear creek", "The storm last week made the internet go down, and now it will intermittently stop working. This is much worse than it has been, and it will usually take up to 5 minutes to load my emails. This is affecting the whole appartment and should be fixed ASAP", "active", "2023-01-21", "2023-01-21", null);
INSERT INTO `ticketingsystem`.`ticket` (`userID`, `title`, `info`, `status`, `dateCreated`, `dateModified`, `dateCompleted`) VALUES (4, "Power line down from the storm on May 23rd", "During the storm on may 23rd, a powerline went down on Catamaran St. I have contacted PG&E, but would like to add a ticket here to document this", "active", "2023-01-21", "2023-01-21", null);
INSERT INTO `ticketingsystem`.`ticket` (`userID`, `title`, `info`, `status`, `dateCreated`, `dateModified`, `dateCompleted`) VALUES (3, "Leaky sink", "When doing dishes the other night, I noticed my sink leaking water down below from the garbage disposal. I put a bucket under it before it leaked anywhere, but it would be nice to be fixed sooner as opposed to later.", "active", "2023-01-21", "2023-01-21", null);

INSERT INTO `ticketingsystem`.`fieldtag` (`field`, `tag`) VALUES ("Community Location", "Bear Creek");     -- 1
INSERT INTO `ticketingsystem`.`fieldtag` (`field`, `tag`) VALUES ("Community Location", "Vintage Greens"); -- 2
INSERT INTO `ticketingsystem`.`fieldtag` (`field`, `tag`) VALUES ("Community Location", "Island Heights"); -- 3
INSERT INTO `ticketingsystem`.`fieldtag` (`field`, `tag`) VALUES ("Community Location", "Oak Dale Flats"); -- 4
INSERT INTO `ticketingsystem`.`fieldtag` (`field`, `tag`) VALUES ("Home Type", "Condominium"); 			   -- 5
INSERT INTO `ticketingsystem`.`fieldtag` (`field`, `tag`) VALUES ("Home Type", "Studio Appartment");       -- 6
INSERT INTO `ticketingsystem`.`fieldtag` (`field`, `tag`) VALUES ("Home Type", "Maisonette apartments");   -- 7
INSERT INTO `ticketingsystem`.`fieldtag` (`field`, `tag`) VALUES ("Home Type", "House");				   -- 8
INSERT INTO `ticketingsystem`.`fieldtag` (`field`, `tag`) VALUES ("Issue", "Flooding");					   -- 9
INSERT INTO `ticketingsystem`.`fieldtag` (`field`, `tag`) VALUES ("Issue", "Power Outage");                -- 10
INSERT INTO `ticketingsystem`.`fieldtag` (`field`, `tag`) VALUES ("Issue", "Internet Outage");			   -- 11
INSERT INTO `ticketingsystem`.`fieldtag` (`field`, `tag`) VALUES ("Range of impact", "Just me");           -- 12
INSERT INTO `ticketingsystem`.`fieldtag` (`field`, `tag`) VALUES ("Range of impact", "Just my neighbors and me");
INSERT INTO `ticketingsystem`.`fieldtag` (`field`, `tag`) VALUES ("Range of impact", "The whole community"); -- 14

INSERT INTO `ticketingsystem`.`ticketfieldtag` (`ticketID`, `fieldtagID`) VALUES (1, 3);
INSERT INTO `ticketingsystem`.`ticketfieldtag` (`ticketID`, `fieldtagID`) VALUES (1, 7);
INSERT INTO `ticketingsystem`.`ticketfieldtag` (`ticketID`, `fieldtagID`) VALUES (1, 9);
INSERT INTO `ticketingsystem`.`ticketfieldtag` (`ticketID`, `fieldtagID`) VALUES (1, 13);
INSERT INTO `ticketingsystem`.`ticketfieldtag` (`ticketID`, `fieldtagID`) VALUES (2, 1);
INSERT INTO `ticketingsystem`.`ticketfieldtag` (`ticketID`, `fieldtagID`) VALUES (2, 6);
INSERT INTO `ticketingsystem`.`ticketfieldtag` (`ticketID`, `fieldtagID`) VALUES (2, 11);
INSERT INTO `ticketingsystem`.`ticketfieldtag` (`ticketID`, `fieldtagID`) VALUES (2, 14);
INSERT INTO `ticketingsystem`.`ticketfieldtag` (`ticketID`, `fieldtagID`) VALUES (3, 2);
INSERT INTO `ticketingsystem`.`ticketfieldtag` (`ticketID`, `fieldtagID`) VALUES (3, 8);
INSERT INTO `ticketingsystem`.`ticketfieldtag` (`ticketID`, `fieldtagID`) VALUES (3, 10);
INSERT INTO `ticketingsystem`.`ticketfieldtag` (`ticketID`, `fieldtagID`) VALUES (3, 14);
INSERT INTO `ticketingsystem`.`ticketfieldtag` (`ticketID`, `fieldtagID`) VALUES (4, 4);
INSERT INTO `ticketingsystem`.`ticketfieldtag` (`ticketID`, `fieldtagID`) VALUES (4, 6);
INSERT INTO `ticketingsystem`.`ticketfieldtag` (`ticketID`, `fieldtagID`) VALUES (4, 9);
INSERT INTO `ticketingsystem`.`ticketfieldtag` (`ticketID`, `fieldtagID`) VALUES (4, 12);

INSERT INTO `ticketingsystem`.`template` (`title`, `info`) VALUES ("Bear Creek Internet Issues", "For the tennants of bear creek appartments who recieve internet issues, please submit with this template.");
INSERT INTO `ticketingsystem`.`template` (`title`, `info`) VALUES ("House flooded from the storm", "After the storm on may 23rd, if your house was flooded and you need the area inspected, please use this template");

INSERT INTO `ticketingsystem`.`templatefieldtag` (`templateID`, `fieldtagID`) VALUES (1, 1);
INSERT INTO `ticketingsystem`.`templatefieldtag` (`templateID`, `fieldtagID`) VALUES (1, 11);
INSERT INTO `ticketingsystem`.`templatefieldtag` (`templateID`, `fieldtagID`) VALUES (2, 8);
INSERT INTO `ticketingsystem`.`templatefieldtag` (`templateID`, `fieldtagID`) VALUES (2, 9);

-- Test Functions and updates go below here
-- UPDATE `ticketingsystem`.`user` SET `username` = "bmgee", `password` = "passcode" WHERE `userID` = 2;

-- This is an example of a call to validate a user and password
-- SELECT * FROM `ticketingsystem`.`user` A WHERE BINARY A.`username` = 'admin' AND BINARY A.`password` = 'password'; 
-- SELECT * FROM `ticketingsystem`.`user`;
-- SELECT * FROM `ticketingsystem`.`theme` ORDER BY themeID LIMIT 1;

-- This is an example of a ticket instance with fields and user name
-- SELECT A.`ticketID`, A.`title`, D.`fName`, D.`lName`, C.`field`, C.`tag`, A.`info`, A.`dateCreated`, A.`dateModified` FROM `ticketingsystem`.`ticket` A INNER JOIN `ticketingsystem`.`ticketfieldtag` B ON A.`ticketID` = B.`ticketID` INNER JOIN `ticketingsystem`.`fieldtag` C ON B.`fieldtagID` = C.`fieldtagID` INNER JOIN `ticketingsystem`.`user` D ON A.userID = D.userID WHERE A.`ticketID` = 1;

-- This is an example of a ticket template with 3 tags, title, and info on the template
-- SELECT * FROM `ticketingsystem`.`template` A INNER JOIN `ticketingsystem`.`templatefieldtag` B ON A.`templateID` = B.`templateID` INNER JOIN `ticketingsystem`.`fieldtag` C ON B.`fieldtagID` = C.`fieldtagID` WHERE B.`templateID` = 1;
-- this is an example of getting all the tickets a user can see based on their userID (the number 2 in the subquerry right below is the userID that should be a ? in the actual call)
-- SELECT * FROM `ticketingsystem`.`ticket` A INNER JOIN (SELECT `ticketingsystem`.`getTicketsByUserID`(`ticketID`, `userID`, 4) as ticketID FROM `ticketingsystem`.`ticket`) B ON A.`ticketID` = B.`ticketID`;

-- SELECT * FROM ticketingsystem.template A INNER JOIN ticketingsystem.templatefieldtag B ON A.templateID = B.templateID INNER JOIN ticketingsystem.fieldtag C ON B.fieldtagID = C.fieldtagID WHERE A.templateID = 1;
-- SELECT A.ticketID as ticketID, A.userID as userID, A.title as title, A.info as info, A.status as status, A.dateCreated as dateCreated, A.dateModified as dateModified, A.dateCompleted as dateCompleted, C.fName as fName, C.lName as lName FROM ticketingsystem.ticket A INNER JOIN (SELECT ticketingsystem.getTicketsByUserID(ticketID, userID, 2) as ticketID FROM ticketingsystem.ticket) B ON A.ticketID = B.ticketID INNER JOIN ticketingsystem.user C ON A.userID = C.userID;
-- SELECT ticketID FROM ticketingsystem.ticket WHERE userID = 3 AND title LIKE "Test Ticket3" AND info LIKE "This is ticket information3" ORDER BY ticketID DESC;