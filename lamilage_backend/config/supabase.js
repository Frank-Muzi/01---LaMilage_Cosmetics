const fs = require("fs");
const path = require("path");
const envPath = path.resolve(__dirname, "..", ".env");
console.log("Looking for .env at", envPath);
console.log(".env exists?", fs.existsSync(envPath));
const result = require("dotenv").config({ path: envPath });
console.log("dotenv result", result);
console.log("SUPABASE_KEY after dotenv:", process.env.SUPABASE_KEY);

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://ofnzesujtovsjacbmdvi.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  throw new Error("Supabase key is required. Set SUPABASE_KEY in lamilage_backend/.env");
}

console.log("Supabase key loaded successfully");

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;