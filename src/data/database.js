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

      db.run("INSERT INTO Questions VALUES (1, 'Spurning 1?', 1);");
      db.run("INSERT INTO Questions VALUES (2, 'Spurning 2?', 1);");
      db.run("INSERT INTO Questions VALUES (3, 'Spurning 3?', 1);");
      db.run("INSERT INTO Questions VALUES (4, 'Spurning 4?', 1);");
      db.run("INSERT INTO Questions VALUES (5, 'Spurning 5?', 1);");

      db.get('SELECT * from Questions;', err => {
        // , rows) => {
        if (err) {
          console.error(err);
        } else {
          // console.log(rows);
        }
      });
    });
  });
}

export { db, populate };
