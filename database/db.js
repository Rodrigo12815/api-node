const oracledb = require('oracledb');

// Configuración de la conexión
const dbConfig = {
  user: process.env.DB_ORACLE_USER,
  password: process.env.DB_ORACLE_PASS,
  connectString: process.env.DB_ORACLE_STRING_CONECTION // Cambia según tu configuración
};

async function getConnection() {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    console.log('Conectado a Oracle');
    return connection;
  } catch (err) {
    console.error('Error de conexión a Oracle', err);
  }

  return null;
}

// Función para ejecutar una consulta
async function executeQuery(query) {
  let connection;

  try {
    connection = await getConnection();
    const result = await connection.execute(query);
    return result.rows; // Devuelve las filas resultantes
  } catch (err) {
    console.error('Error al ejecutar la consulta', err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión', err);
      }
    }
  }
}

module.exports = { executeQuery };
