import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL 
const supabaseApiKey = process.env.SUPABASE_ANON_KEY 

if (!supabaseUrl || !supabaseApiKey) {
  throw new Error('Supabase URL or API key is not defined.');
}
console.log(supabaseUrl);


export const supabase = createClient(supabaseUrl, supabaseApiKey);

// const sql = `
//   CREATE TABLE commands (
//     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     user_id UUID,
//     name VARCHAR(255),
//     description TEXT,
//     category VARCHAR(50),
//     package_manager VARCHAR(50),
//     framework VARCHAR(50),
//     version_control VARCHAR(50),
//     containerization VARCHAR(50),
//     usage TEXT,
//     created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
//   );
// `;

// export const createTable = async () => {
//   try {
//     const { data, error } = await supabase.rpc('exec', { sql });

//     if (error) {
//       console.error('Error creating table:', error.message);
//     } else {
//       console.log('Table created successfully:', data);
//     }
//   } catch (error) {
//     console.error('Error creating table:', (error as Error).message);
//   }
// };

