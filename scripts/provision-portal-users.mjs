#!/usr/bin/env node
/**
 * Create or update portal employee accounts (production or local).
 *
 *   PORTAL_TEMP_PASSWORD='YourTemp123!' node scripts/provision-portal-users.mjs
 *
 * Optional env PORTAL_USERS_JSON — array of { email, name, role? }
 */

import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const DEFAULT_USERS = [
  { email: 'juan.solano@bihospharma.com', name: 'Juan Solano', role: 'employee' },
  { email: 'julian.villamil@bihospharma.com', name: 'Julian Villamil', role: 'employee' },
];

const password = process.env.PORTAL_TEMP_PASSWORD;
if (!password || password.length < 8) {
  console.error('Set PORTAL_TEMP_PASSWORD (min 8 chars) before running.');
  process.exit(1);
}

const users = process.env.PORTAL_USERS_JSON
  ? JSON.parse(process.env.PORTAL_USERS_JSON)
  : DEFAULT_USERS;

const prisma = new PrismaClient();

try {
  const hash = await bcrypt.hash(password, 10);
  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { passwordHash: hash, name: u.name, role: u.role || 'employee' },
      create: {
        email: u.email,
        name: u.name,
        passwordHash: hash,
        role: u.role || 'employee',
      },
    });
    console.log('✓', u.email);
  }
  console.log(`Done — ${users.length} user(s) ready. Share PORTAL_TEMP_PASSWORD securely.`);
} finally {
  await prisma.$disconnect();
}
