'use client'

import { QRCodeSVG } from 'qrcode.react'
import { MessageCircle, Send, Mail, User, Sparkles } from 'lucide-react'

export default function Home() {
  // The deployed URL - will be updated after deployment
  const websiteUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : 'https://peter-nikolaev.vercel.app'

  const contactLinks = [
    {
      name: 'WhatsApp',
      handle: '+971 54 281 6719',
      href: 'https://wa.me/971542816719',
      icon: MessageCircle,
      color: 'from-green-500 to-emerald-600',
      hoverColor: 'hover:from-green-400 hover:to-emerald-500',
    },
    {
      name: 'Telegram',
      handle: '@nikolaevpeter',
      href: 'https://t.me/nikolaevpeter',
      icon: Send,
      color: 'from-blue-500 to-cyan-600',
      hoverColor: 'hover:from-blue-400 hover:to-cyan-500',
    },
    {
      name: 'Email',
      handle: 'pn@getsome.llc',
      href: 'mailto:pn@getsome.llc',
      icon: Mail,
      color: 'from-indigo-500 to-purple-600',
      hoverColor: 'hover:from-indigo-400 hover:to-purple-500',
    },
  ]

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-dark-card border border-dark-border rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="h-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative">
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Profile Section */}
          <div className="px-6 pb-6">
            {/* Avatar */}
            <div className="relative -mt-12 mb-4 flex justify-center">
              <div className="w-24 h-24 rounded-full bg-dark border-4 border-dark-card flex items-center justify-center shadow-xl">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full p-1.5">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Name & Title */}
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                Peter Nikolaev
              </h1>
              <p className="text-gradient text-sm sm:text-base font-medium">
                AI Consultant / Developer
              </p>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center mb-6">
              <div className="bg-white p-3 rounded-xl shadow-lg">
                <QRCodeSVG
                  value={websiteUrl}
                  size={140}
                  level="M"
                  includeMargin={false}
                  bgColor="#ffffff"
                  fgColor="#0f0f0f"
                />
              </div>
              <p className="text-gray-500 text-xs mt-2">Scan to save contact</p>
            </div>

            {/* Contact Buttons */}
            <div className="space-y-3">
              {contactLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.name !== 'Email' ? '_blank' : undefined}
                  rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  className={`flex items-center gap-4 w-full p-4 rounded-xl bg-gradient-to-r ${link.color} ${link.hoverColor} transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <link.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white/80 text-xs font-medium uppercase tracking-wider">
                      {link.name}
                    </p>
                    <p className="text-white font-semibold text-sm sm:text-base">
                      {link.handle}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-dark-border text-center">
              <p className="text-gray-500 text-xs">
                Tap any button to connect
              </p>
            </div>
          </div>
        </div>

        {/* Subtle branding */}
        <p className="text-center text-gray-600 text-xs mt-4">
          Digital Contact Card
        </p>
      </div>
    </main>
  )
}
