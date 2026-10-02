import { AuthResponse, AuthUser, ProjectItem, SiteContent } from "@/types/content";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

const TOKEN_KEY = "winner_admin_token";
const USER_KEY = "winner_admin_user";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredAuth(auth: AuthResponse) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, auth.access);
  localStorage.setItem(USER_KEY, JSON.stringify(auth.user));
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem(USER_KEY);
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

export function clearStoredAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function get<T>(endpoint: string, token?: string | null): Promise<T> {
  const headers: Record<string, string> = {};
  const authToken = token || getStoredToken();
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.detail || `GET ${endpoint} failed (${res.status})`);
  }

  return res.json();
}

export async function post<T>(endpoint: string, body: any, token?: string | null): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const authToken = token || getStoredToken();
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.detail || `POST ${endpoint} failed (${res.status})`);
  }

  return res.json();
}

export async function put<T>(endpoint: string, body: any, token?: string | null): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const authToken = token || getStoredToken();
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.detail || `PUT ${endpoint} failed (${res.status})`);
  }

  return res.json();
}

export async function del(endpoint: string, token?: string | null): Promise<void> {
  const headers: Record<string, string> = {};
  const authToken = token || getStoredToken();
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.detail || `DELETE ${endpoint} failed (${res.status})`);
  }
}

export async function uploadMedia(file: File, token?: string | null): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const headers: Record<string, string> = {};
  const authToken = token || getStoredToken();
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const res = await fetch(`${API_BASE_URL}/api/upload/`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.detail || "Image upload failed");
  }

  const data = await res.json();
  return data.url;
}

export async function getSiteContent(): Promise<SiteContent> {
  return get<SiteContent>("/api/content/");
}

export async function updateSiteContent(content: Partial<SiteContent>, token?: string | null): Promise<SiteContent> {
  return put<SiteContent>("/api/content/", content, token);
}

export async function loginAdmin(username: string, password: string): Promise<AuthResponse> {
  const data = await post<AuthResponse>("/api/auth/login/", { username, password });
  setStoredAuth(data);
  return data;
}

export async function getMe(token?: string | null): Promise<AuthUser> {
  return get<AuthUser>("/api/auth/me/", token);
}
