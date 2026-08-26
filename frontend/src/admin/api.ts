/**
 * admin/api.ts
 *
 * API client helper for Portfolio CMS Admin Dashboard.
 * Handles auth cookies, JWT tokens, error parsing, and API calls.
 */

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') || 'http://localhost:5001';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('admin_token');
  
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

export const adminApi = {
  // Auth
  login: (credentials: { email: string; password: string }) =>
    apiFetch('/api/admin/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  
  logout: () =>
    apiFetch('/api/admin/auth/logout', { method: 'POST' }),

  getMe: () =>
    apiFetch('/api/admin/auth/me'),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    apiFetch('/api/admin/auth/change-password', { method: 'POST', body: JSON.stringify(data) }),

  // Dashboard
  getDashboard: () =>
    apiFetch('/api/admin/dashboard'),

  // Visibility
  getVisibility: () =>
    apiFetch('/api/admin/visibility'),

  toggleVisibility: (section: string, visible: boolean) =>
    apiFetch('/api/admin/visibility', { method: 'POST', body: JSON.stringify({ section, visible }) }),

  // CRUD Helpers
  getProjects: () => apiFetch('/api/admin/projects'),
  createProject: (data: any) => apiFetch('/api/admin/projects', { method: 'POST', body: JSON.stringify(data) }),
  updateProject: (id: string, data: any) => apiFetch(`/api/admin/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProject: (id: string) => apiFetch(`/api/admin/projects/${id}`, { method: 'DELETE' }),

  getExperiences: () => apiFetch('/api/admin/experiences'),
  createExperience: (data: any) => apiFetch('/api/admin/experiences', { method: 'POST', body: JSON.stringify(data) }),
  updateExperience: (id: string, data: any) => apiFetch(`/api/admin/experiences/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteExperience: (id: string) => apiFetch(`/api/admin/experiences/${id}`, { method: 'DELETE' }),

  getEducation: () => apiFetch('/api/admin/education'),
  createEducation: (data: any) => apiFetch('/api/admin/education', { method: 'POST', body: JSON.stringify(data) }),
  updateEducation: (id: string, data: any) => apiFetch(`/api/admin/education/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteEducation: (id: string) => apiFetch(`/api/admin/education/${id}`, { method: 'DELETE' }),

  getSkills: () => apiFetch('/api/admin/skills'),
  createSkill: (data: any) => apiFetch('/api/admin/skills', { method: 'POST', body: JSON.stringify(data) }),
  updateSkill: (id: string, data: any) => apiFetch(`/api/admin/skills/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteSkill: (id: string) => apiFetch(`/api/admin/skills/${id}`, { method: 'DELETE' }),

  getAchievements: () => apiFetch('/api/admin/achievements'),
  createAchievement: (data: any) => apiFetch('/api/admin/achievements', { method: 'POST', body: JSON.stringify(data) }),
  updateAchievement: (id: string, data: any) => apiFetch(`/api/admin/achievements/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAchievement: (id: string) => apiFetch(`/api/admin/achievements/${id}`, { method: 'DELETE' }),

  getTestimonials: () => apiFetch('/api/admin/testimonials'),
  createTestimonial: (data: any) => apiFetch('/api/admin/testimonials', { method: 'POST', body: JSON.stringify(data) }),
  updateTestimonial: (id: string, data: any) => apiFetch(`/api/admin/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTestimonial: (id: string) => apiFetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' }),

  getBlogs: () => apiFetch('/api/admin/blogs'),
  createBlog: (data: any) => apiFetch('/api/admin/blogs', { method: 'POST', body: JSON.stringify(data) }),
  updateBlog: (id: string, data: any) => apiFetch(`/api/admin/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBlog: (id: string) => apiFetch(`/api/admin/blogs/${id}`, { method: 'DELETE' }),

  getNews: () => apiFetch('/api/admin/news'),
  createNews: (data: any) => apiFetch('/api/admin/news', { method: 'POST', body: JSON.stringify(data) }),
  updateNews: (id: string, data: any) => apiFetch(`/api/admin/news/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteNews: (id: string) => apiFetch(`/api/admin/news/${id}`, { method: 'DELETE' }),

  getMedia: () => apiFetch('/api/admin/media'),
  uploadMedia: (formData: FormData) => apiFetch('/api/admin/media/upload', { method: 'POST', body: formData }),
  deleteMedia: (id: string) => apiFetch(`/api/admin/media/${id}`, { method: 'DELETE' }),

  getMessages: () => apiFetch('/api/admin/messages'),
  updateMessageStatus: (id: string, status: string) => apiFetch(`/api/admin/messages/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  deleteMessage: (id: string) => apiFetch(`/api/admin/messages/${id}`, { method: 'DELETE' }),

  getSettings: () => apiFetch('/api/admin/settings'),
  updateSettings: (data: any) => apiFetch('/api/admin/settings', { method: 'PUT', body: JSON.stringify(data) }),

  getSectionContent: () => apiFetch('/api/admin/section-content'),
  updateSectionContent: (data: any) => apiFetch('/api/admin/section-content', { method: 'PUT', body: JSON.stringify(data) }),
  updateSingleSectionContent: (sectionKey: string, data: any) => apiFetch(`/api/admin/section-content/${sectionKey}`, { method: 'PUT', body: JSON.stringify(data) }),

  getAuditLogs: () => apiFetch('/api/admin/audit-logs'),
};
