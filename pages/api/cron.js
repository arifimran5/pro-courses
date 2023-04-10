import { supabase } from "../../utils/supabaseinit";

// just to keep database running and not get shut down by supabase
export default async function handler(req, res) {
  await supabase.from("post").select("*");
  res.status(200).end("Hello Cron!");
}
