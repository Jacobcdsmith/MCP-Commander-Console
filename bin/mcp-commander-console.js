#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import and run the main server using proper file:// URL on Windows
const serverPath = resolve(__dirname, '..', 'server.js');
const serverUrl = new URL(`file://${serverPath.replace(/\\/g, '/')}`).href;
import(serverUrl);