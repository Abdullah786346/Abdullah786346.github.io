"use client";
import React, { useState, useEffect } from 'react';

interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'read' | 'replied';
}

interface NewsletterData {
  subscribers: number;
  data: { email: string; subscribedAt: string }[];
}

const AdminDashboard: React.FC = () => {
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [newsletterData, setNewsletterData] = useState<NewsletterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'contacts' | 'newsletter'>('contacts');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contactResponse, newsletterResponse] = await Promise.all([
        fetch('/api/contact'),
        fetch('/api/newsletter')
      ]);

      const contactData = await contactResponse.json();
      const newsletterData = await newsletterResponse.json();

      setContactMessages(contactData.messages || []);
      setNewsletterData(newsletterData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage contact messages and newsletter subscribers</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Messages</h3>
            <p className="text-3xl font-bold text-blue-600">{contactMessages.length}</p>
            <p className="text-gray-600 text-sm">Total messages received</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Newsletter Subscribers</h3>
            <p className="text-3xl font-bold text-green-600">{newsletterData?.subscribers || 0}</p>
            <p className="text-gray-600 text-sm">Active subscribers</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('contacts')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'contacts'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Contact Messages ({contactMessages.length})
              </button>
              <button
                onClick={() => setActiveTab('newsletter')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'newsletter'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Newsletter Subscribers ({newsletterData?.subscribers || 0})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'contacts' && (
              <div className="space-y-4">
                {contactMessages.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No contact messages yet.</p>
                ) : (
                  contactMessages.map((message) => (
                    <div key={message.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg">
                          {message.firstName} {message.lastName}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {formatDate(message.submittedAt)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <p><strong>Email:</strong> {message.email}</p>
                        {message.mobileNumber && (
                          <p><strong>Phone:</strong> {message.mobileNumber}</p>
                        )}
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-800">{message.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'newsletter' && (
              <div className="space-y-4">
                {!newsletterData?.data || newsletterData.data.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No newsletter subscribers yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subscribed At
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {newsletterData.data.map((subscriber, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {subscriber.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(subscriber.subscribedAt)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;