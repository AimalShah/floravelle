import { readFileSync } from 'fs';
import { join } from 'path';

let envCache: Record<string, string> | null = null;

export function loadEnv() {
  if (envCache) return envCache;
  
  // Start with process.env which is where Vercel injects variables
  const env: Record<string, string> = { ...process.env as any };
  
  try {
    const envPath = join(process.cwd(), '.env');
    const file = readFileSync(envPath, 'utf-8');
    const lines = file.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...values] = trimmed.split('=');
      if (key) {
        const val = values.join('=').trim();
        // Remove quotes if present
        env[key.trim()] = val.replace(/^["'](.*)["']$/, '$1');
      }
    }
  } catch (e) {
    // .env file might not exist in production, which is fine
  }

  envCache = env;
  return env;
}

export function getEnv(key: string): string {
  const env = loadEnv();
  return env[key] || '';
}