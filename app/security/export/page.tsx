'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, FileSpreadsheet, FileCode, Calendar, Filter, CheckCircle } from 'lucide-react';

export default function ExportPage() {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [selectedReports, setSelectedReports] = useState<string[]>(['vulnerabilities', 'compliance']);
  const [exporting, setExporting] = useState(false);

  const formats = [
    { id: 'pdf', name: 'PDF Report', icon: FileText, description: 'Detailed formatted report' },
    { id: 'csv', name: 'CSV Export', icon: FileSpreadsheet, description: 'Spreadsheet compatible' },
    { id: 'json', name: 'JSON Data', icon: FileCode, description: 'Raw data format' },
  ];

  const reports = [
    { id: 'vulnerabilities', name: 'Vulnerability Report', description: 'All detected vulnerabilities' },
    { id: 'compliance', name: 'Compliance Report', description: 'Compliance status and gaps' },
    { id: 'inventory', name: 'Asset Inventory', description: 'All scanned assets' },
    { id: 'sbom', name: 'SBOM Export', description: 'Software bill of materials' },
    { id: 'audit', name: 'Audit Log', description: 'Security event history' },
    { id: 'executive', name: 'Executive Summary', description: 'High-level overview' },
  ];

  const toggleReport = (id: string) => {
    setSelectedReports(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const handleExport = async () => {
    setExporting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setExporting(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Download className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Export Reports</h1>
          </div>
          <p className="text-gray-400">Generate and download security reports</p>
        </motion.div>

        {/* Format Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold mb-4">Select Format</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {formats.map((format) => (
              <button
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedFormat === format.id
                    ? 'bg-purple-500/20 border-purple-500'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <format.icon className={`w-8 h-8 mb-3 ${
                  selectedFormat === format.id ? 'text-purple-400' : 'text-gray-400'
                }`} />
                <h3 className="font-semibold">{format.name}</h3>
                <p className="text-sm text-gray-400">{format.description}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Report Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold mb-4">Select Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((report) => (
              <button
                key={report.id}
                onClick={() => toggleReport(report.id)}
                className={`p-4 rounded-xl border text-left transition-all flex items-start gap-4 ${
                  selectedReports.includes(report.id)
                    ? 'bg-purple-500/20 border-purple-500'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className={`p-1 rounded ${
                  selectedReports.includes(report.id) ? 'text-purple-400' : 'text-gray-500'
                }`}>
                  {selectedReports.includes(report.id) ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <div className="w-6 h-6 border-2 border-current rounded-full" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{report.name}</h3>
                  <p className="text-sm text-gray-400">{report.description}</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Date Range */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold mb-4">Date Range</h2>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-2">From</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
                  defaultValue="2024-01-01"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-2">To</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
                  defaultValue="2024-01-21"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Export Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={handleExport}
            disabled={selectedReports.length === 0 || exporting}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-purple-500 hover:bg-purple-600 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className={`w-5 h-5 ${exporting ? 'animate-bounce' : ''}`} />
            {exporting ? 'Generating Report...' : `Export ${selectedReports.length} Report(s) as ${selectedFormat.toUpperCase()}`}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
