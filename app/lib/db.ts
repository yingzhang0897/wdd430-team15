import postgres from "postgres";

declare global {
  // eslint-disable-next-line no-var
  var sql: ReturnType<typeof postgres> | undefined;
}

const sql =
  globalThis.sql ?? postgres(process.env.POSTGRES_URL!, { ssl: "require" });

if (process.env.NODE_ENV !== "production") {
  globalThis.sql = sql;
}

export default sql;
