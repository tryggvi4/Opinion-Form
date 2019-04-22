const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:', err => {
  if (err) {
    return console.error(err.message);
  }
  return -1;
  // console.log('Connected to the in-memory SQlite database.');
});

function populate() {
  // Búa til töflur og gögn
  return new Promise(() => {
    // (resolve, reject) //TODO: setja inn resolve og reject
    db.serialize(() => {
      // Búa til töflur fyrir framenda
      db.run(
        'CREATE TABLE Surveys ( \n' +
          'sID INTEGER PRIMARY KEY AUTOINCREMENT, \n' +
          'name VARCHAR);',
      );
      db.run(
        'CREATE TABLE Questions ( \n' +
          'qID INTEGER PRIMARY KEY AUTOINCREMENT, \n' +
          'questionText VARCHAR, \n' +
          'sID INTEGER, \n' +
          'CONSTRAINT fk_Surveys FOREIGN KEY (sID) \n' +
          'REFERENCES Surveys(sID));',
      );
      db.run(
        'CREATE TABLE Options ( \n' +
          'oID INTEGER PRIMARY KEY AUTOINCREMENT, \n' +
          'optionText VARCHAR, \n' +
          'qID INTEGER, \n' +
          'CONSTRAINT fk_Questions FOREIGN KEY (qID) \n' +
          'REFERENCES Questions(qID));',
      );
      db.run(
        'CREATE TABLE AnswersWithoutForeignKeys ( \n' +
          'aID INTEGER PRIMARY KEY AUTOINCREMENT, \n' +
          'questionText1 VARCHAR, \n' +
          'questionAns1 VARCHAR, \n' +
          'questionText2 VARCHAR, \n' +
          'questionAns2 VARCHAR, \n' +
          'questionText3 VARCHAR, \n' +
          'questionAns3 VARCHAR);',
      );

      db.run(
        'CREATE TABLE Answers ( \n' +
        'aID INTEGER PRIMARY KEY AUTOINCREMENT, \n' +
        'whatUser VARCHAR, \n' + // Mögulega bara Int ID
        'questionText VARCHAR, \n' + // Mögulega að foreignkeya á spurninga töfluna
          'questionAns VARCHAR, \n' +
          'sID INTEGER, \n' +
          'CONSTRAINT fk_Surveys FOREIGN KEY (sID) \n' +
          'REFERENCES Surveys(sID));',
      );

      // Inserta könnun
      db.run(
        "INSERT INTO Surveys Values (1, 'Viðhorfskönnun foreldra í knattspyrnu 2018-2019');",
      );
      db.run("INSERT INTO Surveys Values (2, 'Survey 2');");
      // Inserta spurningar
      db.run("INSERT INTO Questions VALUES (1, 'Spurning 1?', 1);");
      db.run("INSERT INTO Questions VALUES (2, 'Spurning 2?', 1);");
      db.run("INSERT INTO Questions VALUES (3, 'Spurning 3?', 1);");
      db.run("INSERT INTO Questions VALUES (4, 'Spurning 1?', 2);");
      // Inserta svör
      db.run("INSERT INTO Options VALUES (1, 'Svar 1', 1);");
      db.run("INSERT INTO Options VALUES (2, 'Svar 2', 1);");
      db.run("INSERT INTO Options VALUES (3, 'Svar 3', 1);");
      db.run("INSERT INTO Options VALUES (4, 'Svar 1', 2);");
      db.run("INSERT INTO Options VALUES (5, 'Svar 2', 2);");
      db.run("INSERT INTO Options VALUES (6, 'Svar 3', 2);");
      db.run("INSERT INTO Options VALUES (7, 'Svar 1', 3);");
      db.run("INSERT INTO Options VALUES (8, 'Svar 2', 3);");
      db.run("INSERT INTO Options VALUES (9, 'Svar 3', 3);");

      db.run(
        "INSERT INTO AnswersWithoutForeignKeys VALUES (1, 'Spurning1', 'Svar1', 'Spurning2', 'Svar2','Spurning3', 'Svar3');",
      );
      db.run(
        "INSERT INTO AnswersWithoutForeignKeys VALUES (2, 'Spurning1', 'Svar1', 'Spurning2', 'Svar2','Spurning3', 'Svar3');",
      );

      db.run(
        "INSERT INTO Answers VALUES (1, 'currentUserDemo', 'Spurning1', 'svar1', 1);",
      );
      db.run(
        "INSERT INTO Answers VALUES (2, 'currentUserDemo', 'Spurning2', 'svar2', 1);",
      );

      // Test kóði
      // db.get('SELECT * from Questions;', (err,rows) => {
      //   if (err) {
      //     console.error(err);
      //   } else {
      //     console.log(rows);
      //   }
      // });
    });
  });
}

export { db, populate };
