'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Code, Zap, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const navigateHome = () => {
    window.location.href = '/';
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Terminal-style header */}
        <div className="bg-gray-800 rounded-t-lg border border-gray-700 p-3 mb-0">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-gray-400 text-sm font-mono ml-2">~/404-error</div>
          </div>
        </div>

        {/* Terminal content */}
        <div className="bg-black rounded-b-lg border-x border-b border-gray-700 p-8 font-mono">
          <div className="text-left space-y-2 mb-8">
            <div className="text-green-400">
              <span className="text-gray-500">$</span> npm start
            </div>
            <div className="text-gray-400">Starting development server{dots}</div>
            <div className="text-red-400">
              <span className="text-gray-500">✗</span> Error: Route not found
            </div>
            <div className="text-yellow-400 text-sm">
              → The page you&apos;re looking for doesn&apos;t exist
            </div>
          </div>

          {/* 404 with code styling */}
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
              404
            </div>
            <h2 className="text-xl text-gray-300 mb-2">Page Not Found</h2>
            <p className="text-gray-500 text-sm">
              This route hasn&apos;t been implemented yet.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={navigateHome}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition-colors flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Button>
            
            <Button 
              onClick={goBack}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-2 rounded-md font-medium flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </div>

          {/* Bottom terminal info */}
          <div className="mt-8 pt-4 border-t border-gray-800 text-left">
            <div className="text-gray-500 text-xs space-y-1">
              <div className="flex items-center gap-2">
                <Code className="w-3 h-3" />
                <span>Quick fix: Check your routing configuration</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3" />
                <span>Status: Development server running</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle branding */}
        <div className="mt-6 text-gray-600 text-xs">
          Built with ⚡ Bolt
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;