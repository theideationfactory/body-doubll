import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 p-8 pt-24">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/timer')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Timer</span>
        </button>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-teal-600" />
            <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
          </div>

          <div className="space-y-6 text-gray-600">
            <p>
              We take your privacy seriously. This policy describes what personal information we collect and how we use it.
            </p>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Information Collection and Use</h2>
              <p>
                We only collect and use information that is necessary for the functionality of our timer application:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-2">
                <li>Calendar data (when you choose to sync with Google Calendar)</li>
                <li>Timer preferences and settings</li>
                <li>Basic usage data to improve the application</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Data Storage</h2>
              <p>
                All your timer data is stored locally on your device. If you choose to sync with Google Calendar, 
                we only access your calendar data with your explicit permission and do not store it permanently.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Third-Party Services</h2>
              <p>
                We use Google Calendar API for calendar integration. When you use this feature, you'll be asked 
                to grant permission through Google's secure OAuth process. We only request access to read your 
                calendar events to create corresponding timers.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Data Protection</h2>
              <p>
                We implement security measures to protect your information. We do not sell, trade, or transfer 
                your information to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact</h2>
              <p>
                If you have questions about this privacy policy, you can contact us through our support channels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}