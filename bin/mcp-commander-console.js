#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import and run the main server - resolve relative to the installed package location
const serverPath = resolve(__dirname, '..', 'server.js');
import(`file://${serverPath.replace(/\\/g, '/')}`);