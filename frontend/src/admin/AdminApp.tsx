import React, { useState, useEffect } from 'react'
import AdminLogin from './components/AdminLogin'
import AdminHeader from './components/AdminHeader'
import AdminSidebar, { TabKey } from './components/AdminSidebar'
import DashboardOverviewTab from './tabs/DashboardOverviewTab'
import ContentManagerTab from './tabs/ContentManagerTab'
import ProjectsTab from './tabs/ProjectsTab'
import EventsGalleryTab from './tabs/EventsGalleryTab'
import GalleryPhotosTab from './tabs/GalleryPhotosTab'
import ExperienceTab from './tabs/ExperienceTab'
import EducationTab from './tabs/EducationTab'
import SkillsTab from './tabs/SkillsTab'
import AchievementsTab from './tabs/AchievementsTab'
import TestimonialsTab from './tabs/TestimonialsTab'
import BlogTab from './tabs/BlogTab'
import NewsTab from './tabs/NewsTab'
import MediaLibraryTab from './tabs/MediaLibraryTab'
import ContactMessagesTab from './tabs/ContactMessagesTab'
import AnalyticsTab from './tabs/AnalyticsTab'
import SeoSettingsTab from './tabs/SeoSettingsTab'
import AuditLogsTab from './tabs/AuditLogsTab'
import { adminApi } from './api'

const AdminApp: React.FC = () => {
  const [user, setUser] = useState<{ email: string; role: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabKey>('overview')
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Verify auth on mount
  const checkAuth = async () => {
    try {
      const res = await adminApi.getMe()
      setUser(res.user)
    } catch (err) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  // Fetch dashboard overview metrics
  const fetchDashboard = async () => {
    try {
      const res = await adminApi.getDashboard()
      setDashboardData(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (user) {
      fetchDashboard()
      const interval = setInterval(fetchDashboard, 10000) // Poll stats every 10s
      return () => clearInterval(interval)
    }
  }, [user])

  const handleLogout = async () => {
    try {
      await adminApi.logout()
    } catch (e) {}
    localStorage.removeItem('admin_token')
    setUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030610] text-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <AdminLogin onSuccess={(user) => { setUser(user); fetchDashboard(); }} />
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverviewTab data={dashboardData} onRefresh={fetchDashboard} onNavigateTab={setActiveTab} />
      case 'visibility':
        return <ContentManagerTab />
      case 'projects':
        return <ProjectsTab />
      case 'events-gallery':
        return <EventsGalleryTab />
      case 'gallery-photos':
        return <GalleryPhotosTab />
      case 'experience':
        return <ExperienceTab />
      case 'education':
        return <EducationTab />
      case 'skills':
        return <SkillsTab />
      case 'achievements':
        return <AchievementsTab />
      case 'testimonials':
        return <TestimonialsTab />
      case 'blogs':
        return <BlogTab />
      case 'news':
        return <NewsTab />
      case 'media':
        return <MediaLibraryTab />
      case 'messages':
        return <ContactMessagesTab />
      case 'analytics':
        return <AnalyticsTab overviewData={dashboardData} />
      case 'settings':
        return <SeoSettingsTab />
      case 'audit':
        return <AuditLogsTab />
      default:
        return <DashboardOverviewTab data={dashboardData} onRefresh={fetchDashboard} onNavigateTab={setActiveTab} />
    }
  }

  return (
    <div className="min-h-screen bg-[#030610] text-white font-sans selection:bg-cyan-500/30">
      <AdminHeader
        userEmail={user.email}
        onlineCount={dashboardData?.metrics?.onlineVisitors || 1}
        mobileOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(prev => !prev)}
        onLogout={handleLogout}
      />

      <div className="flex">
        <AdminSidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          unreadMessagesCount={dashboardData?.metrics?.unreadMessages || 0}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-x-hidden min-h-[calc(100vh-4rem)]">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  )
}

export default AdminApp
