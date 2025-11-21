'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Play, CheckCircle, Clock, Trophy, BookOpen, Target, Users } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  completed: boolean;
  modules: number;
}

export default function TrainingPage() {
  const courses: Course[] = [
    { id: '1', title: 'Secure Coding Fundamentals', description: 'Learn the basics of writing secure code', duration: '2 hours', level: 'beginner', progress: 100, completed: true, modules: 8 },
    { id: '2', title: 'OWASP Top 10', description: 'Understanding the most critical web security risks', duration: '3 hours', level: 'intermediate', progress: 65, completed: false, modules: 10 },
    { id: '3', title: 'API Security Best Practices', description: 'Secure your APIs against common attacks', duration: '2.5 hours', level: 'intermediate', progress: 30, completed: false, modules: 7 },
    { id: '4', title: 'DevSecOps Essentials', description: 'Integrate security into your CI/CD pipeline', duration: '4 hours', level: 'advanced', progress: 0, completed: false, modules: 12 },
    { id: '5', title: 'Cloud Security', description: 'Secure your AWS, Azure, and GCP environments', duration: '3.5 hours', level: 'advanced', progress: 0, completed: false, modules: 9 },
    { id: '6', title: 'Incident Response', description: 'How to handle security incidents', duration: '2 hours', level: 'intermediate', progress: 0, completed: false, modules: 6 },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-green-400 bg-green-500/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'advanced': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const stats = {
    completed: courses.filter(c => c.completed).length,
    inProgress: courses.filter(c => c.progress > 0 && !c.completed).length,
    totalHours: courses.reduce((sum, c) => sum + parseFloat(c.duration), 0),
    avgProgress: Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / courses.length),
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Security Training</h1>
          </div>
          <p className="text-gray-400">Improve your team&apos;s security knowledge</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'text-green-400' },
            { label: 'In Progress', value: stats.inProgress, icon: Clock, color: 'text-yellow-400' },
            { label: 'Total Hours', value: `${stats.totalHours}h`, icon: BookOpen },
            { label: 'Avg Progress', value: `${stats.avgProgress}%`, icon: Target, color: 'text-purple-400' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color || 'text-white'}`}>{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color || 'text-gray-400'}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-purple-500/50 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
                {course.completed && (
                  <Trophy className="w-5 h-5 text-yellow-400" />
                )}
              </div>
              <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{course.description}</p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${course.completed ? 'bg-green-500' : 'bg-purple-500'}`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </span>
                <span>{course.modules} modules</span>
              </div>

              <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 rounded-lg transition-colors">
                {course.progress === 0 ? (
                  <>
                    <Play className="w-4 h-4" />
                    Start Course
                  </>
                ) : course.completed ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Review
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Continue
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
