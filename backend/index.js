require('dotenv').config()
const Snowflake = require('snowflake-promise').Snowflake;
// or, for TypeScript:

const connect = async () => {
    const opts = {
        account: process.env.ACCOUNT,
        username: process.env.SNOWFLAKE_USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        warehouse: process.env.WAREHOUSE
    }
    console.log(opts)
    const snowflake = new Snowflake(opts);

    await snowflake.connect();

    return snowflake;

}


const main = async () => {
    const snowflake = await connect()

    const rows = await snowflake.execute('select * from dev_edw_junction.junction_2020.cafe_pos_data;')

    /*const rows = await snowflake.execute(
        'SELECT COUNT(*) FROM CUSTOMER WHERE C_MKTSEGMENT=:1',
        ['AUTOMOBILE']
    );*/

    console.log(rows);
}

main();