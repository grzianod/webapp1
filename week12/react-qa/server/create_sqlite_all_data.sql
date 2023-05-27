BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "questions" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"text"	TEXT,
	"author"	TEXT,
	"date"	DATE
);
CREATE TABLE IF NOT EXISTS "answers" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"text"	TEXT,
	"respondent"	TEXT,
	"score"	INTEGER,
	"date"	DATE,
	"questionId"	INTEGER
);
INSERT INTO "questions" VALUES (1,'Best way of enumerating an array in JS?','Enrico','2023-02-28');
INSERT INTO "answers" VALUES (1,'for of','Alice',3,'2023-03-06',1);
INSERT INTO "answers" VALUES (2,'for i=0,i<N,i++','Harry',1,'2023-03-04',1);
INSERT INTO "answers" VALUES (3,'for in','Harry',-2,'2023-03-02',1);
INSERT INTO "answers" VALUES (4,'i=0 while(i<N)','Carol',-1,'2023-03-01',1);
COMMIT;
