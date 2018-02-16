


--create table
CREATE TABLE koala (
	id serial primary key,
	name char(30),
	gender char(10),
	age integer,
	ready_to_transfer char(1),
	notes varchar(255)
);


--insert values
INSERT INTO koala ("name", "gender", "age", "ready_to_transfer", "notes")
VALUES ('Scotty', 'M', '4', 'Y', 'Born in Guatemala');

INSERT INTO koala ("name", "gender", "age", "ready_to_transfer", "notes")
VALUES ('Jean', 'F', '5', 'Y', 'Allergiuc to lots of lava');

INSERT INTO koala ("name", "gender", "age", "ready_to_transfer", "notes")
VALUES ('Ororo', 'F', '7', 'N', 'Loves listening to Paula (Abdul)');

INSERT INTO koala ("name", "gender", "age", "ready_to_transfer", "notes")
VALUES ('Logan', 'M', '15', 'N', 'Loves the sauna');

INSERT INTO koala ("name", "gender", "age", "ready_to_transfer", "notes")
VALUES ('Charlie', 'M', '9', 'Y', 'Favorite band is Nirvana');

INSERT INTO koala ("name", "gender", "age", "ready_to_transfer", "notes")
VALUES ('Betsy', 'F', '4', 'Y', 'Has a pet iguana');