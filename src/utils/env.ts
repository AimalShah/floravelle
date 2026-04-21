import { readFileSync } from 'fs';
import { join } from 'path';

let envCache: Record<string, string> | null = null;

export function loadEnv() {
  if (envCache) return envCache;
  
  try {
    const envPath = join(process.cwd(), '.env');
    const file = readFileSync(envPath, 'utf-8');
    const lines = file.split('\n');
    const env: Record<string, string> = {};
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...values] = trimmed.split('=');
      if (key) env[key.trim()] = values.join('=').trim();
    }
    envCache = env;
    return env;
  } catch (e) {
    return {};
  }
}

export function getEnv(key: string): string {
  const env = loadEnv();
  return env[key] || '';
}