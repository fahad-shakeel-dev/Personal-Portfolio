"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  HelpCircle,
  Send,
  CheckCircle,
  Clock,
  Globe,
  Users,
  Award,
} from "lucide-react";
import Navbar from "../components/HomePage/Navbar/Navbar";
import Footer from "../components/HomePage/FooterSection/footer";
import { contactConfig } from "@/lib/contact-config";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    serviceInterestedIn: "",
    projectBudgetAmount: "",
    projectBudgetCurrency: "PKR",
    projectDetails: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currencies = [
    { value: "PKR", label: "PKR (Pakistani Rupee)", minBudget: 15000 },
    { value: "USD", label: "USD (US Dollar)", minBudget: 54 },
    { value: "INR", label: "INR (Indian Rupee)", minBudget: 4500 },
    { value: "EUR", label: "EUR (Euro)", minBudget: 48 },
    { value: "GBP", label: "GBP (British Pound)", minBudget: 41 },
  ];

  const iconMap = {
    Phone: Phone,
    Mail: Mail,
    MapPin: MapPin,
    MessageCircle: MessageCircle,
    Users: Users,
    Globe: Globe,
    Award: Award,
    Clock: Clock,
    HelpCircle: HelpCircle,
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateBudget = () => {
    const amount = parseFloat(formData.projectBudgetAmount);
    if (isNaN(amount)) return "Please enter a valid budget amount.";
    const currency = currencies.find((c) => c.value === formData.projectBudgetCurrency);
    if (!currency) return "Please select a valid currency.";
    if (amount < currency.minBudget) {
      return `Budget must be at least ${currency.minBudget} ${currency.value}.`;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSubmitStatus(null);

    const budgetError = validateBudget();
    if (budgetError) {
      setError(budgetError);
      setLoading(false);
      setTimeout(() => setError(null), 3000);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          companyName: formData.companyName,
          serviceInterestedIn: formData.serviceInterestedIn,
          projectBudget: `${formData.projectBudgetAmount} ${formData.projectBudgetCurrency}`,
          projectDetails: formData.projectDetails,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to submit form");
      }

      setSubmitStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        companyName: "",
        serviceInterestedIn: "",
        projectBudgetAmount: "",
        projectBudgetCurrency: "PKR",
        projectDetails: "",
      });
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (err) {
      setError("Error submitting form: " + err.message);
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-8 font-sans bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-200 min-h-screen">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-md mb-4">
            <MessageCircle className="w-7 h-7 text-teal-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Let&#39;s Start a <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Conversation</span>
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">Connect with our team in Faisalabad to transform your digital presence.</p>
        </div>

        {/* Contact Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Send us a Message</h2>
            <p className="text-gray-600 mb-4">We&#39;ll respond within 24 hours.</p>
            {submitStatus === "success" && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-600 mr-2" />
                <p className="text-emerald-800">Message sent successfully!</p>
              </div>
            )}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <p className="text-red-800">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="+92 123 456 7890"
                  />
                </div>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Your Company"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="serviceInterestedIn" className="block text-sm font-medium text-gray-700 mb-1">Service Interested In *</label>
                  <select
                    id="serviceInterestedIn"
                    name="serviceInterestedIn"
                    value={formData.serviceInterestedIn}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="SEO Optimization">SEO Optimization</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Branding">Branding</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="projectBudgetAmount" className="block text-sm font-medium text-gray-700 mb-1">Project Budget *</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      id="projectBudgetAmount"
                      name="projectBudgetAmount"
                      value={formData.projectBudgetAmount}
                      onChange={handleChange}
                      required
                      min="0"
                      step="1"
                      className="w-2/3 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter amount"
                    />
                    <select
                      id="projectBudgetCurrency"
                      name="projectBudgetCurrency"
                      value={formData.projectBudgetCurrency}
                      onChange={handleChange}
                      className="w-1/3 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      {currencies.map((currency) => (
                        <option key={currency.value} value={currency.value}>
                          {currency.value}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum: {currencies.find((c) => c.value === formData.projectBudgetCurrency).minBudget}{" "}
                    {formData.projectBudgetCurrency}
                  </p>
                </div>
              </div>
              <div>
                <label htmlFor="projectDetails" className="block text-sm font-medium text-gray-700 mb-1">Project Details *</label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-2 rounded-lg hover:from-teal-600 hover:to-emerald-600 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Get in Touch</h3>
              {contactConfig.contactDetails.map((item, index) => {
                const Icon = iconMap[item.icon];
                return (
                  <div key={index} className="flex items-start mb-3 last:mb-0">
                    <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center mr-2">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-gray-700 text-sm">{detail}</p>
                      ))}
                      <p className="text-gray-500 text-xs">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Why Choose Us</h3>
              <div className="grid grid-cols-2 gap-3">
                {contactConfig.stats.map((stat, index) => {
                  const Icon = iconMap[stat.icon];
                  return (
                    <div key={index} className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center mx-auto text-gray-500 mb-2">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                      <div className="text-gray-600 text-sm">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Answers to common questions from our clients.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contactConfig.faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md border border-gray-100 p-4">
                <div className="flex items-start mb-2">
                  <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center mr-2">
                    <HelpCircle className="w-4 h-4 text-teal-600" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">{faq.question}</h3>
                </div>
                <p className="text-gray-700 text-sm ml-10">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div>
          <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl shadow-md p-6 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Ready to Get Started?</h2>
            <p className="text-white/90 text-sm mb-4 max-w-xl mx-auto">Let&#39;s discuss your project and achieve your digital goals.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+92707140829" className="px-4 py-2 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-50">
                <Phone className="w-4 h-4 mr-2 inline" />
                Call Now
              </a>
              <button className="px-4 py-2 bg-transparent border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10">
                <Calendar className="w-4 h-4 mr-2 inline" />
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}