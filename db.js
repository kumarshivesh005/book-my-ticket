import  pg from 'pg';


const pool=new pg.Pool({
    user:"postgres",
    host:"localhost",
    database:"sql_class_2_db",
    password:'postgres',
    port:5432

});

export default pool;
