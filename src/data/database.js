const sqlite3 = require('sqlite3').verbose();

// Býr til sqlite3 inmemory gagnagrunn
const db = new sqlite3.Database(':memory:', err => {
  if (err) {
    return console.error(err.message);
  }
  return -1;
  // console.log('Connected to the in-memory SQlite database.');
});

// Hérna eru 4 töflur
// 3 halda utan um Könnunina
// 1 heldur utan um svörin frá notendum
// Þær tengjsast: Options -> Questions -> Surveys
// Þannig er hægt að sýna alla valmöguleika sem tengjast spurningu sem tengist könnun
// Svör eru síðan skráð ein lína fyrir hverja spurningu og línurnar tengjast síðan með whatUser breytunni
// Tengjst: Answers -> Surveys

// Bý til töflurnar og gögnin í þær
function populate() {
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
          'type VARCHAR, \n' +
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
        'CREATE TABLE Answers ( \n' +
        'aID INTEGER PRIMARY KEY AUTOINCREMENT, \n' +
        'whatUser VARCHAR, \n' + // Future work, autogenerate'a unique id fyrir hverja innsendingu
          'questionText VARCHAR, \n' +
          'questionAns VARCHAR, \n' +
          'sID INTEGER, \n' +
          'CONSTRAINT fk_Surveys FOREIGN KEY (sID) \n' +
          'REFERENCES Surveys(sID));',
        // Future work, questionText og QuestionAns við töflurnar hér að ofan
      );
      // Inserta könnun
      db.run(
        "INSERT INTO Surveys (name) Values ('Viðhorfskönnun foreldra í knattspyrnu 2018-2019');",
      );
      // Inserta spurningar
      db.run(
        "INSERT INTO Questions (questionText, type, sID) VALUES ('Ég er ánægð(ur) með þjónustu Vals í heild sinni', 'radio', 1);",
      );
      db.run(
        "INSERT INTO Questions (questionText, type, sID) VALUES ('Þjálfun flokksins í heild sinni er góð', 'radio', 1);",
      );
      db.run(
        "INSERT INTO Questions (questionText, type, sID) VALUES ('Ég er ánægð(ur) með samskipti og upplýsingamiðlun innan flokksins', 'radio', 1);",
      );
      // Inserta svarmöguleika
      db.run("INSERT INTO Options (optionText, qID) VALUES ('1', 1);");
      db.run("INSERT INTO Options (optionText, qID) VALUES ('2', 1);");
      db.run("INSERT INTO Options (optionText, qID) VALUES ('3', 1);");
      db.run("INSERT INTO Options (optionText, qID) VALUES ('4', 1);");
      db.run("INSERT INTO Options (optionText, qID) VALUES ('5', 1);");
      db.run("INSERT INTO Options (optionText, qID) VALUES ('1', 2);");
      db.run("INSERT INTO Options (optionText, qID) VALUES ('2', 2);");
      db.run("INSERT INTO Options (optionText, qID) VALUES ('3', 2);");
      db.run("INSERT INTO Options (optionText, qID) VALUES ('4', 2);");
      db.run("INSERT INTO Options (optionText, qID) VALUES ('5', 2);");
      db.run("INSERT INTO Options (optionText, qID) VALUES ('1', 3);");
      db.run("INSERT INTO Options (optionText, qID) VALUES ('2', 3);");
      db.run("INSERT INTO Options (optionText, qID) VALUES ('3', 3);");
      db.run("INSERT INTO Options (optionText, qID) VALUES ('4', 3);");
      db.run("INSERT INTO Options (optionText, qID) VALUES ('5', 3);");
      // Inserta svör
      db.run(
        "INSERT INTO Answers VALUES (1, 'currentUserDemo', 'Spurning1', 'svar1', 1);",
      );
      db.run(
        "INSERT INTO Answers VALUES (2, 'currentUserDemo', 'Spurning2', 'svar2', 1);",
      );

      // Test kóði
      // db.get('SELECT * from Answers;', (err,rows) => {
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
