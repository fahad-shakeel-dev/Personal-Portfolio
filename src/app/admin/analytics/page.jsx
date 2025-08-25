"use client"

import { useState } from "react"

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("visitors")

  // Mock analytics data - replace with actual data fetching
  const analyticsData = {
    overview: {
      totalVisitors: 12847,
      totalPageViews: 34521,
      totalProjects: 24,
      totalContacts: 156,
      totalReviews: 89,
      totalTestimonials: 45,
      conversionRate: 3.2,
      avgSessionDuration: "2m 34s",
    },
    trends: {
      visitors: {
        current: 12847,
        previous: 11234,
        change: 14.4,
        data: [
          { date: "2024-01-01", value: 245 },
          { date: "2024-01-02", value: 312 },
          { date: "2024-01-03", value: 289 },
          { date: "2024-01-04", value: 456 },
          { date: "2024-01-05", value: 398 },
          { date: "2024-01-06", value: 523 },
          { date: "2024-01-07", value: 467 },
        ],
      },
      pageViews: {
        current: 34521,
        previous: 28934,
        change: 19.3,
        data: [
          { date: "2024-01-01", value: 678 },
          { date: "2024-01-02", value: 834 },
          { date: "2024-01-03", value: 756 },
          { date: "2024-01-04", value: 1123 },
          { date: "2024-01-05", value: 987 },
          { date: "2024-01-06", value: 1245 },
          { date: "2024-01-07", value: 1098 },
        ],
      },
      contacts: {
        current: 156,
        previous: 134,
        change: 16.4,
        data: [
          { date: "2024-01-01", value: 5 },
          { date: "2024-01-02", value: 8 },
          { date: "2024-01-03", value: 6 },
          { date: "2024-01-04", value: 12 },
          { date: "2024-01-05", value: 9 },
          { date: "2024-01-06", value: 15 },
          { date: "2024-01-07", value: 11 },
        ],
      },
    },
    topPages: [
      { page: "/", views: 8934, percentage: 25.9 },
      { page: "/projects", views: 6721, percentage: 19.5 },
      { page: "/about", views: 4532, percentage: 13.1 },
      { page: "/contact", views: 3876, percentage: 11.2 },
      { page: "/services", views: 2945, percentage: 8.5 },
    ],
    topProjects: [
      { name: "E-commerce Platform", views: 2341, likes: 45, inquiries: 23 },
      { name: "Mobile Banking App", views: 1987, likes: 32, inquiries: 18 },
      { name: "Portfolio Website", views: 1654, likes: 67, inquiries: 15 },
      { name: "Task Management System", views: 1432, likes: 28, inquiries: 12 },
      { name: "Social Media Dashboard", views: 1298, likes: 41, inquiries: 9 },
    ],
    deviceBreakdown: [
      { device: "Desktop", percentage: 45.2, visitors: 5823 },
      { device: "Mobile", percentage: 38.7, visitors: 4971 },
      { device: "Tablet", percentage: 16.1, visitors: 2068 },
    ],
    trafficSources: [
      { source: "Direct", percentage: 34.5, visitors: 4432 },
      { source: "Google Search", percentage: 28.3, visitors: 3636 },
      { source: "Social Media", percentage: 18.7, visitors: 2402 },
      { source: "Referrals", percentage: 12.1, visitors: 1554 },
      { source: "Email", percentage: 6.4, visitors: 823 },
    ],
    contactAnalytics: {
      totalSubmissions: 156,
      responseRate: 94.2,
      avgResponseTime: "4.2 hours",
      conversionRate: 23.1,
      topInquiryTypes: [
        { type: "Web Development", count: 45, percentage: 28.8 },
        { type: "Mobile App", count: 32, percentage: 20.5 },
        { type: "UI/UX Design", count: 28, percentage: 17.9 },
        { type: "Branding", count: 24, percentage: 15.4 },
        { type: "Consultation", count: 27, percentage: 17.3 },
      ],
    },
    reviewsAnalytics: {
      totalReviews: 89,
      averageRating: 4.6,
      responseRate: 87.6,
      ratingDistribution: [
        { rating: 5, count: 52, percentage: 58.4 },
        { rating: 4, count: 23, percentage: 25.8 },
        { rating: 3, count: 9, percentage: 10.1 },
        { rating: 2, count: 3, percentage: 3.4 },
        { rating: 1, count: 2, percentage: 2.2 },
      ],
    },
  }

  const periods = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 3 months" },
    { value: "1y", label: "Last year" },
  ]

  const metrics = [
    { value: "visitors", label: "Visitors" },
    { value: "pageViews", label: "Page Views" },
    { value: "contacts", label: "Contacts" },
  ]

  const getChangeColor = (change) => {
    return change >= 0 ? "text-green-600" : "text-red-600"
  }

  const getChangeIcon = (change) => {
    return change >= 0 ? "↗" : "↘"
  }

  const renderMiniChart = (data) => {
    const maxValue = Math.max(...data.map((d) => d.value))
    return (
      <div className="flex items-end gap-1 h-8">
        {data.map((point, index) => (
          <div
            key={index}
            className="bg-emerald-200 rounded-sm flex-1"
            style={{ height: `${(point.value / maxValue) * 100}%` }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-emerald-800">Analytics Dashboard</h1>
            <p className="text-emerald-600 mt-1">Portfolio performance insights and metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {periods.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <span className={`text-sm font-medium ${getChangeColor(analyticsData.trends.visitors.change)}`}>
              {getChangeIcon(analyticsData.trends.visitors.change)} {Math.abs(analyticsData.trends.visitors.change)}%
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-800">
              {analyticsData.overview.totalVisitors.toLocaleString()}
            </p>
            <p className="text-sm text-emerald-600">Total Visitors</p>
          </div>
          <div className="mt-4">{renderMiniChart(analyticsData.trends.visitors.data)}</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <span className={`text-sm font-medium ${getChangeColor(analyticsData.trends.pageViews.change)}`}>
              {getChangeIcon(analyticsData.trends.pageViews.change)} {Math.abs(analyticsData.trends.pageViews.change)}%
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-800">
              {analyticsData.overview.totalPageViews.toLocaleString()}
            </p>
            <p className="text-sm text-emerald-600">Page Views</p>
          </div>
          <div className="mt-4">{renderMiniChart(analyticsData.trends.pageViews.data)}</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className={`text-sm font-medium ${getChangeColor(analyticsData.trends.contacts.change)}`}>
              {getChangeIcon(analyticsData.trends.contacts.change)} {Math.abs(analyticsData.trends.contacts.change)}%
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-800">{analyticsData.overview.totalContacts}</p>
            <p className="text-sm text-emerald-600">Contact Submissions</p>
          </div>
          <div className="mt-4">{renderMiniChart(analyticsData.trends.contacts.data)}</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-emerald-600">
              {analyticsData.reviewsAnalytics.averageRating}/5
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-800">{analyticsData.overview.totalReviews}</p>
            <p className="text-sm text-emerald-600">Total Reviews</p>
          </div>
          <div className="mt-4 flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(analyticsData.reviewsAnalytics.averageRating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-emerald-800">Traffic Overview</h2>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-1 border border-emerald-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {metrics.map((metric) => (
                <option key={metric.value} value={metric.value}>
                  {metric.label}
                </option>
              ))}
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {analyticsData.trends[selectedMetric].data.map((point, index) => {
              const maxValue = Math.max(...analyticsData.trends[selectedMetric].data.map((d) => d.value))
              const height = (point.value / maxValue) * 100
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="bg-emerald-500 rounded-t-sm w-full transition-all duration-300 hover:bg-emerald-600"
                    style={{ height: `${height}%` }}
                    title={`${point.date}: ${point.value}`}
                  />
                  <span className="text-xs text-emerald-600 mt-2">{new Date(point.date).getDate()}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
          <h2 className="text-xl font-semibold text-emerald-800 mb-6">Device Breakdown</h2>
          <div className="space-y-4">
            {analyticsData.deviceBreakdown.map((device, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" style={{ opacity: 1 - index * 0.2 }} />
                  <span className="text-emerald-700">{device.device}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-emerald-100 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: `${device.percentage}%`, opacity: 1 - index * 0.2 }}
                    />
                  </div>
                  <span className="text-sm text-emerald-600 w-12 text-right">{device.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
          <h2 className="text-xl font-semibold text-emerald-800 mb-6">Top Pages</h2>
          <div className="space-y-4">
            {analyticsData.topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-emerald-800">{page.page}</p>
                  <p className="text-sm text-emerald-600">{page.views.toLocaleString()} views</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 bg-emerald-100 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${page.percentage}%` }} />
                  </div>
                  <span className="text-sm text-emerald-600 w-12 text-right">{page.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Projects */}
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
          <h2 className="text-xl font-semibold text-emerald-800 mb-6">Top Projects</h2>
          <div className="space-y-4">
            {analyticsData.topProjects.map((project, index) => (
              <div key={index} className="border border-emerald-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-emerald-800">{project.name}</p>
                  <span className="text-sm text-emerald-600">{project.views} views</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-emerald-600">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    {project.likes} likes
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {project.inquiries} inquiries
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Sources & Contact Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
          <h2 className="text-xl font-semibold text-emerald-800 mb-6">Traffic Sources</h2>
          <div className="space-y-4">
            {analyticsData.trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-emerald-800">{source.source}</p>
                  <p className="text-sm text-emerald-600">{source.visitors.toLocaleString()} visitors</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 bg-emerald-100 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${source.percentage}%` }} />
                  </div>
                  <span className="text-sm text-emerald-600 w-12 text-right">{source.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Analytics */}
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
          <h2 className="text-xl font-semibold text-emerald-800 mb-6">Contact Analytics</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-800">{analyticsData.contactAnalytics.responseRate}%</p>
              <p className="text-sm text-emerald-600">Response Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-800">{analyticsData.contactAnalytics.avgResponseTime}</p>
              <p className="text-sm text-emerald-600">Avg Response Time</p>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium text-emerald-800">Top Inquiry Types</h3>
            {analyticsData.contactAnalytics.topInquiryTypes.map((type, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-emerald-700">{type.type}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-emerald-100 rounded-full h-1.5">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${type.percentage}%` }} />
                  </div>
                  <span className="text-xs text-emerald-600 w-8 text-right">{type.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Analytics */}
      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
        <h2 className="text-xl font-semibold text-emerald-800 mb-6">Reviews Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-800">{analyticsData.reviewsAnalytics.averageRating}</p>
            <p className="text-sm text-emerald-600">Average Rating</p>
            <div className="flex justify-center mt-2">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(analyticsData.reviewsAnalytics.averageRating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-800">{analyticsData.reviewsAnalytics.responseRate}%</p>
            <p className="text-sm text-emerald-600">Response Rate</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-800">{analyticsData.reviewsAnalytics.totalReviews}</p>
            <p className="text-sm text-emerald-600">Total Reviews</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-medium text-emerald-800 mb-4">Rating Distribution</h3>
          <div className="space-y-2">
            {analyticsData.reviewsAnalytics.ratingDistribution.map((rating) => (
              <div key={rating.rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm text-emerald-700">{rating.rating}</span>
                  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="flex-1 bg-emerald-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${rating.percentage}%` }} />
                </div>
                <span className="text-sm text-emerald-600 w-12 text-right">{rating.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
