const dbSchool = require('../db');
const schoolPeriod = {};
const tableName = 'sys_school_period';


schoolPeriod.getSchoolPeriodsByparams = async (params,connection_trx) => {
    const connection = connection_trx;
    try {
        const [school] = await  connection.select('*').from(tableName).where(params);
        return school ? school : null
    } catch (error) {
        console.error('Error fetching school from tenant database', error);
        return null;
    }

}



module.exports = schoolPeriod;