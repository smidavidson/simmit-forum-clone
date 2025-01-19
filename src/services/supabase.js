import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://cefjldnjtsgwuvsbrnck.supabase.co';
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlZmpsZG5qdHNnd3V2c2JybmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyNTk1MTAsImV4cCI6MjA1MjgzNTUxMH0.EZF9_FJ7BjY_x3cwgniHmW3LhjizeSvddejPq05PLhk';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
