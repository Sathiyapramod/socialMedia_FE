import { createClient } from "@supabase/supabase-js";

const API_ENDPOINT = import.meta.env.VITE_APP_SUPABASE_URL;
const API_KEY = import.meta.env.VITE_APP_SUPABASE_TOKEN;
const supabase = createClient(API_ENDPOINT, API_KEY, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

export default supabase;
