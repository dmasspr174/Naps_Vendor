import { createClient as createBrowserSupabaseClient } from './client';
import { createClient as createServerSupabaseClient } from './server';

// Unified helper exports for Supabase
export { createBrowserSupabaseClient, createServerSupabaseClient };
export { createBrowserSupabaseClient as createClient };
