import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("todo.db");

export function dbInit() {
  return new Promise((resolve, reject) => {
    database.transaction(
      (transaction) => {
        transaction.executeSql(
          // SQL Command
          `CREATE TABLE IF NOT EXISTS Tasks(
            id INTEGER PRIMARY KEY NOT NULL,
            description TEXT,
            isComplete INT
          )`,

          // Arguments
          [],

          // SQL Success
          (transaction, resultSet) => {
            resolve(resultSet);
          },

          // SQL Error
          (transaction, error) => {
            reject(error);
          }
        );
      },

      // Transaction Error
      (error) => {
        reject(error);
      }
    );
  });
}

export function dbAddTask(description, isComplete) {
  return new Promise((resolve, reject) => {
    database.transaction(
      (transaction) => {
        transaction.executeSql(
          // SQL Command
          `INSERT INTO Tasks(description, isComplete)
           VALUES (?, ?)`,

          // Arguments
          [description, isComplete],

          // SQL Success
          (transaction, resultSet) => {
            resolve(resultSet);
          },

          // SQL Error
          (transaction, error) => {
            reject(error);
          }
        );
      },

      // Transaction Error
      (error) => {
        reject(error);
      }
    );
  });
}

export function dbGetTasks() {
  return new Promise((resolve, reject) => {
    database.transaction(
      (transaction) => {
        transaction.executeSql(
          // SQL Command
          `SELECT id, description, isComplete FROM Tasks`,

          // Arguments
          [],

          // SQL Success
          (transaction, resultSet) => {
            resolve(resultSet);
            console.log("Result:", resultSet);
          },

          // SQL Error
          (transaction, error) => {
            reject(error);
          }
        );
      },

      // Transaction Error
      (error) => {
        reject(error);
      }
    );
  });
}

export function dbUpdateTask(id, isComplete) {
  return new Promise((resolve, reject) => {
    database.transaction(
      (transaction) => {
        transaction.executeSql(
          // SQL Command
          `DELETE FROM Tasks
           WHERE id = ?`,

          // Arguments
          [id],

          // SQL Success
          (transaction, resultSet) => {
            resolve(resultSet);
          },

          // SQL Error
          (transaction, error) => {
            reject(error);
          }
        );
      },

      // Transaction Error
      (error) => {
        reject(error);
      }
    );
  });
}

export function dbDeleteAllTasks() {
  return new Promise((Resolve,reject)=>{
    database.transaction(
      (transaction) => {
        transaction.executeSql(
          'DROP TABLE IF EXISTS Tasks',
          [],
          () => {console.log('Table Deleted'),Resolve('success')},
          (transaction, error) => console.log('Failed to delete table:', error)
          );
          }
    );
  })
   
}
