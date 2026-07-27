import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { list, put } from "@vercel/blob";

const ADMIN_CONFIG_PATH = "admin/config.enc.json";
const SESSION_COOKIE = "tykgjt_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 12;

type PasswordRecord = { salt: string; hash: string };
type AdminConfig = { email: string; password: PasswordRecord; updatedAt: string };
type EncryptedValue = { iv: string; tag: string; ciphertext: string };
export type AdminSession = { email: string; expiresAt: number };

function getBlobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN;
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET?.trim() || "";
}

function configurationKey() {
  const secret = getSessionSecret();
  if (!secret) throw new Error("后台安全密钥尚未配置");
  return createHash("sha256").update(secret).digest();
}

function hashPassword(password: string): PasswordRecord {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return { salt, hash };
}

function verifyPassword(password: string, record: PasswordRecord) {
  const candidate = scryptSync(password, record.salt, 64);
  const expected = Buffer.from(record.hash, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

function encryptConfig(config: AdminConfig): EncryptedValue {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", configurationKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(JSON.stringify(config), "utf8"), cipher.final()]);
  return { iv: iv.toString("base64"), tag: cipher.getAuthTag().toString("base64"), ciphertext: ciphertext.toString("base64") };
}

function decryptConfig(value: EncryptedValue): AdminConfig | null {
  try {
    const decipher = createDecipheriv("aes-256-gcm", configurationKey(), Buffer.from(value.iv, "base64"));
    decipher.setAuthTag(Buffer.from(value.tag, "base64"));
    const plaintext = Buffer.concat([
      decipher.update(Buffer.from(value.ciphertext, "base64")),
      decipher.final(),
    ]).toString("utf8");
    const parsed: unknown = JSON.parse(plaintext);
    if (!parsed || typeof parsed !== "object") return null;
    const config = parsed as Partial<AdminConfig>;
    if (!config.password || typeof config.email !== "string" || typeof config.password.salt !== "string" || typeof config.password.hash !== "string") return null;
    return config as AdminConfig;
  } catch {
    return null;
  }
}

async function getAdminConfig() {
  const token = getBlobToken();
  if (!token || !getSessionSecret()) return null;
  try {
    const { blobs } = await list({ prefix: ADMIN_CONFIG_PATH, limit: 1, token });
    const blob = blobs.find((item) => item.pathname === ADMIN_CONFIG_PATH);
    if (!blob) return null;
    const response = await fetch(blob.url, { cache: "no-store" });
    if (!response.ok) return null;
    return decryptConfig((await response.json()) as EncryptedValue);
  } catch {
    return null;
  }
}

async function saveAdminConfig(config: AdminConfig) {
  const token = getBlobToken();
  if (!token) throw new Error("后台存储尚未配置");
  await put(ADMIN_CONFIG_PATH, JSON.stringify(encryptConfig(config)), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json; charset=utf-8",
    token,
  });
}

export function adminCookieName() {
  return SESSION_COOKIE;
}

export function createAdminSession(email: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
  const value = `${email}.${expiresAt}`;
  const signature = createHash("sha256").update(`${value}.${getSessionSecret()}`).digest("hex");
  return `${value}.${signature}`;
}

export function verifyAdminSession(token: string | undefined): AdminSession | null {
  if (!token || !getSessionSecret()) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [email, expiry, signature] = parts;
  const expiresAt = Number(expiry);
  if (!email || !Number.isFinite(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return null;
  const expected = createHash("sha256").update(`${email}.${expiry}.${getSessionSecret()}`).digest("hex");
  const received = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  if (received.length !== expectedBuffer.length || !timingSafeEqual(received, expectedBuffer)) return null;
  return { email, expiresAt };
}

export async function authenticateAdmin(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const current = await getAdminConfig();
  if (current) return current.email === normalizedEmail && verifyPassword(password, current.password);

  const initialEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const initialPassword = process.env.ADMIN_INITIAL_PASSWORD;
  if (!initialEmail || !initialPassword || normalizedEmail !== initialEmail) return false;
  const initialPasswordBuffer = Buffer.from(initialPassword);
  const passwordBuffer = Buffer.from(password);
  if (initialPasswordBuffer.length !== passwordBuffer.length || !timingSafeEqual(initialPasswordBuffer, passwordBuffer)) return false;

  await saveAdminConfig({ email: initialEmail, password: hashPassword(password), updatedAt: new Date().toISOString() });
  return true;
}

export async function changeAdminPassword(email: string, currentPassword: string, nextPassword: string) {
  const config = await getAdminConfig();
  if (!config || config.email !== email || !verifyPassword(currentPassword, config.password)) return false;
  await saveAdminConfig({ ...config, password: hashPassword(nextPassword), updatedAt: new Date().toISOString() });
  return true;
}
