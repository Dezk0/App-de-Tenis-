import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-url-polyfill';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tlpwbyhpefwawiqhocld.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRscHdieWhwZWZ3YXdpcWhvY2xkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1ODI5MDgsImV4cCI6MjA0NDE1ODkwOH0.Gmy3xlTTjbTcGCJFDJWQ7w38opqCsYtZ0A3NbGNywco";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInURL: false, 
  },
});

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  }
});
