'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, GitBranch, Cloud, Shield, ArrowRight, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [connecting, setConnecting] = useState(false);
  const [connectedServices, setConnectedServices] = useState<string[]>([]);

  const steps = [
    { title: 'Connect Repository', description: 'Link your source code repositories' },
    { title: 'Configure Scanning', description: 'Set up security scanning preferences' },
    { title: 'Invite Team', description: 'Add team members to collaborate' },
    { title: 'Start Scanning', description: 'Begin your first security scan' },
  ];

  const integrations = [
    { id: 'github', name: 'GitHub', icon: Github, color: 'hover:border-gray-500' },
    { id: 'gitlab', name: 'GitLab', icon: GitBranch, color: 'hover:border-orange-500' },
    { id: 'bitbucket', name: 'Bitbucket', icon: GitBranch, color: 'hover:border-blue-500' },
    { id: 'azure', name: 'Azure DevOps', icon: Cloud, color: 'hover:border-cyan-500' },
  ];

  const handleConnect = async (serviceId: string) => {
    setConnecting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setConnectedServices([...connectedServices, serviceId]);
    setConnecting(false);
  };

  const scanTypes = [
    { id: 'sast', name: 'SAST', description: 'Static code analysis', enabled: true },
    { id: 'sca', name: 'SCA', description: 'Dependency scanning', enabled: true },
    { id: 'secrets', name: 'Secrets', description: 'Credential detection', enabled: true },
    { id: 'iac', name: 'IaC', description: 'Infrastructure scanning', enabled: false },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex">
      {/* Sidebar Progress */}
      <div className="w-80 bg-white/5 border-r border-white/10 p-8">
        <div className="flex items-center gap-3 mb-12">
          <Shield className="w-8 h-8 text-purple-400" />
          <span className="text-xl font-bold">Syed.AI</span>
        </div>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index < currentStep
                  ? 'bg-green-500 text-white'
                  : index === currentStep
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-gray-400'
              }`}>
                {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <div className={index <= currentStep ? 'text-white' : 'text-gray-500'}>
                <p className="font-medium">{step.title}</p>
                <p className="text-sm text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-2xl mx-auto"
        >
          {currentStep === 0 && (
            <>
              <h1 className="text-3xl font-bold mb-2">Connect Your Repository</h1>
              <p className="text-gray-400 mb-8">Choose a source control provider to get started</p>
              <div className="grid grid-cols-2 gap-4">
                {integrations.map((integration) => (
                  <button
                    key={integration.id}
                    onClick={() => handleConnect(integration.id)}
                    disabled={connecting || connectedServices.includes(integration.id)}
                    className={`p-6 bg-white/5 border border-white/10 rounded-xl ${integration.color} transition-all ${
                      connectedServices.includes(integration.id) ? 'border-green-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <integration.icon className="w-8 h-8" />
                        <span className="font-medium">{integration.name}</span>
                      </div>
                      {connectedServices.includes(integration.id) ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : connecting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : null}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {currentStep === 1 && (
            <>
              <h1 className="text-3xl font-bold mb-2">Configure Scanning</h1>
              <p className="text-gray-400 mb-8">Select which security scans to enable</p>
              <div className="space-y-4">
                {scanTypes.map((scan) => (
                  <div key={scan.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div>
                      <p className="font-medium">{scan.name}</p>
                      <p className="text-sm text-gray-400">{scan.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={scan.enabled} className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <h1 className="text-3xl font-bold mb-2">Invite Your Team</h1>
              <p className="text-gray-400 mb-8">Add team members to collaborate on security</p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter email addresses (comma separated)"
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500"
                />
                <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                  <p className="text-sm text-purple-300">Tip: You can skip this step and invite team members later from Settings.</p>
                </div>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <h1 className="text-3xl font-bold mb-2">You&apos;re All Set!</h1>
              <p className="text-gray-400 mb-8">Your first security scan is ready to begin</p>
              <div className="p-8 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-xl text-center">
                <Shield className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <p className="text-lg mb-6">Click below to start scanning your repositories for vulnerabilities</p>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium transition-colors"
                >
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-12">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-6 py-3 border border-white/20 rounded-lg disabled:opacity-30 hover:bg-white/5 transition-colors"
            >
              Back
            </button>
            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium transition-colors"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : null}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
