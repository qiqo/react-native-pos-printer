import { NextResponse } from "next/server";
import { Pool } from "pg";

export async function GET(request) {
  let rowCount = 0;

  const dbcredentials = {
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    host: process.env.DBHOST,
    database: process.env.DBNAME,
    port: process.env.DBPORT,
  };

  // const client = new Client(dbcredentials);

  const pool = new Pool({
    ...dbcredentials,
    max: 20,
    idleTimeoutMillis: process.env.PG_IDLE_TIMEOUT,
    connectionTimeoutMillis: process.env.PG_CONN_TIMEOUT,
  });

  try {
    const client = await pool.connect();

    const userquery = `select id, name, formats from files limit 2500;`;

    const updatequery = `update files set formats=$1 where id=$2 and name=$3`;

    // const params = ["francis@quantaplex.com"];
    const result = await client.query(userquery);

    if (result.err) {
      await client.end();
      console.error(result.err);
    } else {
      rowCount = result.rowCount;

      if (result?.rows?.length > 0) {
        for (let i = 0; i < result.rowCount; i++) {
          delete result.rows[i].formats?.small?.buffer;
          delete result.rows[i].formats?.thumbnail?.buffer;
          delete result.rows[i].formats?.medium?.buffer;
          delete result.rows[i].formats?.large?.buffer;

          console.log("ROW DATA:", result.rows[i].formats);

          const params = [
            result.rows[i].formats,
            result.rows[i].id,
            result.rows[i].name,
          ];
          await client.query(updatequery, params);
        }
        console.log("Processed total rows:", result.rowCount);
      }

      await client.end();
    }
  } catch (err) {
    console.log("Error while connecting to DB:", err);
  }

  return NextResponse.json({ rowcount: rowCount }, { status: 200 });
}
