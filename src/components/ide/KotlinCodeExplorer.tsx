import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, Folder, ChevronRight, ChevronDown, Sparkles } from 'lucide-react';
import { KOTLIN_PROJECT_FILES, KotlinFileItem } from '../../data/kotlinFiles';
import JSZip from 'jszip';

interface KotlinCodeExplorerProps {
  initialSelectedPath?: string;
}

export const KotlinCodeExplorer: React.FC<KotlinCodeExplorerProps> = ({
  initialSelectedPath
}) => {
  const [selectedFile, setSelectedFile] = useState<KotlinFileItem>(() => {
    return (
      KOTLIN_PROJECT_FILES.find(f => f.path === initialSelectedPath) ||
      KOTLIN_PROJECT_FILES.find(f => f.name === 'AppNavigation.kt') ||
      KOTLIN_PROJECT_FILES[0]
    );
  });

  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    'navigation': true,
    'screens': true,
    'components': true,
    'data': true,
    'viewmodel': true,
    'config': true,
    'main': true
  });

  const toggleFolder = (folder: string) => {
    setOpenFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setDownloading(true);
      const zip = new JSZip();

      // Add all Kotlin & Gradle files
      KOTLIN_PROJECT_FILES.forEach(file => {
        zip.file(file.path, file.code);
      });

      // Add root build.gradle.kts and settings.gradle.kts
      zip.file(
        "build.gradle.kts",
        `// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.compose) apply false
}
`
      );

      zip.file(
        "settings.gradle.kts",
        `pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\\\.android.*")
                includeGroupByRegex("com\\\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "EduPulse"
include(":app")
`
      );

      zip.file(
        "README.md",
        `# EduPulse - Android Jetpack Compose Mobile App

A complete Android application built with **Kotlin, Android Studio, Jetpack Compose, Material 3, and Navigation Compose**.

## Features Included:
- **Login & Signup** with input validation and show/hide password toggle
- **Dashboard** with personalized user greeting and course cards
- **Dynamic Navigation Route**: \`course/{courseId}\`
- **Dynamic Course Lookup**: \`CourseRepository.getCourseById(courseId)\`
- **Course Details Screen** (displays specific course info based on Course ID)
- **Course Search** by Course Name or Course ID (e.g., PY101, WD101)
- **Profile & Settings** screens
- **Logout flow** with confirmation dialog and stack clearing (\`popUpTo(0)\`)
- **System Back & Back Arrow** handling (\`navController.popBackStack()\`)

## Requirements:
- Android Studio Ladybug (2024.2.1+) or newer
- JDK 17+
- Android SDK 35 (minSdk 24)
`
      );

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'EduPulse-Android-Compose-Project.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to create zip:', err);
    } finally {
      setDownloading(false);
    }
  };

  // Group files by category
  const categories: { id: KotlinFileItem['category']; label: string; icon: string }[] = [
    { id: 'main', label: 'Activity Entry', icon: '📱' },
    { id: 'navigation', label: 'Navigation Compose', icon: '🧭' },
    { id: 'screens', label: 'Screens', icon: '🖼️' },
    { id: 'components', label: 'Components', icon: '🧩' },
    { id: 'data', label: 'Data & Repositories', icon: '💾' },
    { id: 'viewmodel', label: 'ViewModels', icon: '⚡' },
    { id: 'config', label: 'Gradle & Manifest', icon: '⚙️' }
  ];

  return (
    <div className="flex flex-col lg:flex-row h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* File Tree Sidebar */}
      <div className="w-full lg:w-72 bg-slate-950/80 border-b lg:border-b-0 lg:border-r border-slate-800/80 flex flex-col shrink-0">
        <div className="p-3.5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-200 font-semibold text-xs">
            <Folder className="w-4 h-4 text-indigo-400" />
            <span>Android Project Explorer</span>
          </div>
          <button
            onClick={handleDownloadZip}
            disabled={downloading}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition cursor-pointer shadow-xs disabled:opacity-50"
            title="Download full ready-to-build Android Studio project (.zip)"
          >
            <Download className="w-3 h-3" />
            <span>{downloading ? 'Packing...' : 'Export .ZIP'}</span>
          </button>
        </div>

        <div className="overflow-y-auto p-2 space-y-1 flex-1 text-xs">
          {categories.map(cat => {
            const catFiles = KOTLIN_PROJECT_FILES.filter(f => f.category === cat.id);
            if (catFiles.length === 0) return null;
            const isOpen = openFolders[cat.id] ?? true;

            return (
              <div key={cat.id} className="space-y-0.5">
                <button
                  onClick={() => toggleFolder(cat.id)}
                  className="w-full flex items-center gap-1.5 px-2 py-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 rounded-lg text-left transition cursor-pointer font-medium text-[11px]"
                >
                  {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  <span>{cat.label}</span>
                  <span className="ml-auto text-[10px] text-slate-500 font-mono">({catFiles.length})</span>
                </button>

                {isOpen && (
                  <div className="pl-4 space-y-0.5">
                    {catFiles.map(file => {
                      const isSelected = selectedFile.path === file.path;
                      return (
                        <button
                          key={file.path}
                          onClick={() => setSelectedFile(file)}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition cursor-pointer text-xs ${
                            isSelected
                              ? 'bg-indigo-600/30 text-indigo-300 font-semibold border border-indigo-500/40'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                          }`}
                        >
                          <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                          <span className="truncate">{file.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Code Viewer Panel */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900 overflow-hidden">
        {/* Code Header Bar */}
        <div className="h-12 px-4 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-xs font-bold text-slate-200 truncate">{selectedFile.name}</span>
            <span className="text-[11px] text-slate-500 truncate hidden md:inline">
              — {selectedFile.path}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
        </div>

        {/* File Description Banner */}
        <div className="px-4 py-2 bg-slate-800/40 border-b border-slate-800/60 text-xs text-slate-400 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="truncate">{selectedFile.description}</span>
        </div>

        {/* Code Block with Line Numbers */}
        <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed text-slate-300 selection:bg-indigo-500 selection:text-white">
          <pre className="flex">
            {/* Line numbers column */}
            <div className="select-none text-slate-600 pr-4 text-right border-r border-slate-800/80 mr-4 shrink-0">
              {selectedFile.code.split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            {/* Syntax code content */}
            <code className="text-slate-200 overflow-x-auto block">
              {selectedFile.code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
