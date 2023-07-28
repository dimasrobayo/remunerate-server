const Schools = {};

Schools.getAll = async (connection, result) => { 
    const data = await connection.execute('SELECT * FROM data');
    result(null, data[0])
}

module.exports = Schools;