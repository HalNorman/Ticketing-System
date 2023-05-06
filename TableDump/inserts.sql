INSERT INTO `ticketingsystem`.`user` (`fName`, `lName`, `role`, `username`, `password`) VALUES ('Bob', 'McGee', 'employee', 'bmcgee', 'password');
INSERT INTO `ticketingsystem`.`user` (`fName`, `lName`, `role`, `username`, `password`) VALUES ('Bill', 'McGoo', 'user', 'bmcgoo', 'password');
INSERT INTO `ticketingsystem`.`user` (`fName`, `lName`, `role`, `username`, `password`) VALUES ('Bic', 'Michell', 'user', 'bMichell', 'password');
INSERT INTO `ticketingsystem`.`user` (`fName`, `lName`, `role`, `username`, `password`) VALUES ('Alice', 'Match', 'employee', 'aMatch', 'password');
INSERT INTO `ticketingsystem`.`user` (`fName`, `lName`, `role`, `username`, `password`) VALUES ('Stephane', 'Zuiho', 'user', 'sZuiho', 'password');
INSERT INTO `ticketingsystem`.`user` (`fName`, `lName`, `role`, `username`, `password`) VALUES ('Alex', 'Finch', 'user', 'aFinch', 'password');

INSERT INTO `ticketingsystem`.`ticket` (`userID`, `title`, `info`, `status`, `dateCreated`, `dateModified`, `dateCompleted`) VALUES (3, "Broken Washing Machine", "I have been using the whirlpool washing machine that came with the appartment, and it has worked wonderfully up to now. After putting a load into the machine yesterday, I came back to water spewing out of the machine and covering the floor. The water leaked down and seems to be going through the floor.", "active", "2023-02-21", "2023-02-21", null);
INSERT INTO `ticketingsystem`.`ticket` (`userID`, `title`, `info`, `status`, `dateCreated`, `dateModified`, `dateCompleted`) VALUES (4, "Internet down by bear creek", "The storm last week made the internet go down, and now it will intermittently stop working. This is much worse than it has been, and it will usually take up to 5 minutes to load my emails. This is affecting the whole appartment and should be fixed ASAP", "complete", "2023-02-24", "2023-03-14", "2023-03-14");
INSERT INTO `ticketingsystem`.`ticket` (`userID`, `title`, `info`, `status`, `dateCreated`, `dateModified`, `dateCompleted`) VALUES (6, "Power line down from the storm on May 3rd", "During the storm on may 3rd, a powerline went down on Catamaran St. I have contacted PG&E, but would like to add a ticket here to document this", "active", "2023-05-03", "2023-05-03", null);
INSERT INTO `ticketingsystem`.`ticket` (`userID`, `title`, `info`, `status`, `dateCreated`, `dateModified`, `dateCompleted`) VALUES (7, "Leaky sink", "When doing dishes the other night, I noticed my sink leaking water down below from the garbage disposal. I put a bucket under it before it leaked anywhere, but it would be nice to be fixed sooner as opposed to later.", "active", "2023-05-04", "2023-05-04", null);
INSERT INTO `ticketingsystem`.`ticket` (`userID`, `title`, `info`, `status`, `dateCreated`, `dateModified`, `dateCompleted`) VALUES (4, "Bear creek ", "The storm last week made the internet go down, and now it will intermittently stop working. This is much worse than it has been, and it will usually take up to 5 minutes to load my emails. This is affecting the whole appartment and should be fixed ASAP", "complete", "2023-02-24", "2023-03-14", "2023-03-14");


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

INSERT INTO `ticketingsystem`.`template` (`title`, `info`) VALUES ("Bear Creek Internet Issues", "For the tenants of bear creek apartments who receive internet issues, please submit with this template.");
INSERT INTO `ticketingsystem`.`template` (`title`, `info`) VALUES ("House flooded from the storm", "After the storm on may 23rd, if your house was flooded and you need the area inspected, please use this template");

INSERT INTO `ticketingsystem`.`templatefieldtag` (`templateID`, `fieldtagID`) VALUES (1, 1);
INSERT INTO `ticketingsystem`.`templatefieldtag` (`templateID`, `fieldtagID`) VALUES (1, 11);
INSERT INTO `ticketingsystem`.`templatefieldtag` (`templateID`, `fieldtagID`) VALUES (2, 8);
INSERT INTO `ticketingsystem`.`templatefieldtag` (`templateID`, `fieldtagID`) VALUES (2, 9);