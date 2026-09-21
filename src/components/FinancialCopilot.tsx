/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lightbulb, Send, MessageCircle, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { CopilotRecommendation } from '../types';

interface FinancialCopilotProps {
  recommendations: CopilotRecommendation[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const getScenarioConfig = (scenario: CopilotRecommendation['scenario']) => {
  const config: Record<string, { icon: React.ComponentType<any>; bgColor: string; borderColor: string; badgeColor: string; label: string }> = {
    'low-cash-high-ar': {
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      badgeColor: 'bg-red-100 text-red-800',
      label: 'Kas Rendah, Piutang Tinggi',
    },
    'approaching-bpr-due': {
      icon: AlertCircle,
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      badgeColor: 'bg-amber-100 text-amber-800',
      label: 'Jatuh Tempo BPR Mendekat',
    },
    'slow-moving-inventory': {
      icon: AlertCircle,
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      badgeColor: 'bg-orange-100 text-orange-800',
      label: 'Stok Lambat Bergerak',
    },
    'seasonal-opportunity': {
      icon: Lightbulb,
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      label: 'Peluang Musiman',
    },
  };
  return config[scenario] || config['low-cash-high-ar'];
};

const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-50';
    case 'medium':
      return 'text-amber-600 bg-amber-50';
    case 'low':
      return 'text-blue-600 bg-blue-50';
  }
};

export const FinancialCopilot: React.FC<FinancialCopilotProps> = ({ recommendations }) => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'copilot'; message: string }>>([]);

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;
    
    setChatHistory((prev) => [...prev, { role: 'user', message: userMessage }]);
    
    // Simulate copilot response
    setTimeout(() => {
      const responses = [
        'Saya memahami situasi Anda. Rekomendasi saya adalah fokus pada penagihan warung yang paling tertunda terlebih dahulu.',
        'Berdasarkan proyeksi kas, Anda masih punya margin 5 hari sebelum mencapai batas kritis.',
        'Pertimbangkan untuk mengurangi pembelian stok baru minggu ini hingga piutang warung cair.',
        'Saya telah mengidentifikasi 3 warung dengan piutang >14 hari. Prioritaskan penagihan ke mereka dulu.',
      ];
      const response = responses[Math.floor(Math.random() * responses.length)];
      setChatHistory((prev) => [...prev, { role: 'copilot', message: response }]);
    }, 800);

    setUserMessage('');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Main Chat Area - Full Height */}
      <div className="flex-1 flex flex-col bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-semibold text-slate-900 mb-6">
                  Hai, Pak Yudi. Siap mulai?
                </p>
                <p className="text-xs text-slate-500">
                  Tanyakan pertanyaan tentang strategi finansial atau keputusan bisnis Anda
                </p>
              </div>
            </div>
          ) : (
            chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md px-4 py-2.5 rounded-lg text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-slate-100 text-slate-900 rounded-bl-none'
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Chat Input Bar */}
        <div className="border-t border-slate-200 p-4 bg-white">
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
              <span className="text-lg">+</span>
            </button>
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Tanyakan apa saja..."
              className="flex-1 px-4 py-2 text-sm border border-slate-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50"
            />
            <button className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
              <span className="text-lg">🎤</span>
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!userMessage.trim()}
              className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-300 transition-colors"
              title="Kirim pesan"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-2 ml-2">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Diverifikasi • Guardrail Aktif • Tanpa Halusinasi</span>
          </div>
        </div>
      </div>
    </div>
  );
};
