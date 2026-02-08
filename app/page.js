'use client'

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Clock, GripVertical, ChevronDown, ChevronUp, X } from 'lucide-react';

export default function Home() {
  const initialTasks = [
    // Prerequisites
    { id: 1, title: 'Install Local n8n', status: 'todo', category: 'Prerequisites', details: 'Run: docker run -it --rm --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n', priority: 'high' },
    { id: 2, title: 'Create Supabase Account', status: 'todo', category: 'Prerequisites', details: 'Go to supabase.com and create a free account', priority: 'high' },
    { id: 3, title: 'Get OpenAI API Key', status: 'todo', category: 'Prerequisites', details: 'Visit platform.openai.com/api-keys', priority: 'high' },
    { id: 4, title: 'Set Up Google Cloud', status: 'todo', category: 'Prerequisites', details: 'console.cloud.google.com → New Project → Enable Google Drive API', priority: 'high' },
    
    // Supabase Setup
    { id: 5, title: 'Enable pgvector', status: 'todo', category: 'Supabase', details: 'SQL Editor → CREATE EXTENSION IF NOT EXISTS vector;', priority: 'high' },
    { id: 6, title: 'Get Connection Details', status: 'todo', category: 'Supabase', details: 'Project Settings → Database → Copy connection info', priority: 'high' },
    
    // Google Drive Setup
    { id: 7, title: 'Create OAuth Credentials', status: 'todo', category: 'Google Drive', details: 'APIs & Services → Credentials → OAuth client ID', priority: 'high' },
    { id: 8, title: 'Get Drive Folder ID', status: 'todo', category: 'Google Drive', details: 'Create folder in Drive → Copy ID from URL', priority: 'medium' },
    
    // n8n Configuration
    { id: 9, title: 'Add Google Drive Cred', status: 'todo', category: 'n8n Config', details: 'n8n → Credentials → Add Google Drive OAuth2', priority: 'high' },
    { id: 10, title: 'Add OpenAI Cred', status: 'todo', category: 'n8n Config', details: 'n8n → Credentials → Add OpenAI API', priority: 'high' },
    { id: 11, title: 'Add Supabase Cred', status: 'todo', category: 'n8n Config', details: 'n8n → Credentials → Add Postgres', priority: 'high' },
    
    // Workflow Setup
    { id: 12, title: 'Import Workflow JSON', status: 'todo', category: 'Workflow', details: 'n8n → Import from File → Select rag_workflow.json', priority: 'high' },
    { id: 13, title: 'Update Folder ID', status: 'todo', category: 'Workflow', details: 'Edit "List Files from Drive" node → Update folder ID', priority: 'high' },
    { id: 14, title: 'Assign All Credentials', status: 'todo', category: 'Workflow', details: 'Update credentials in all 8 nodes', priority: 'high' },
    
    // Database Init
    { id: 15, title: 'Run Database Setup', status: 'todo', category: 'Database', details: 'Execute "Setup Supabase Table" node', priority: 'high' },
    { id: 16, title: 'Verify Table Created', status: 'todo', category: 'Database', details: 'Supabase → Table Editor → Check "documents"', priority: 'medium' },
    
    // Testing
    { id: 17, title: 'Add Test Document', status: 'todo', category: 'Testing', details: 'Upload PDF to your Google Drive folder', priority: 'medium' },
    { id: 18, title: 'Test Ingestion', status: 'todo', category: 'Testing', details: 'Execute workflow → Verify success', priority: 'high' },
    { id: 19, title: 'Verify in Supabase', status: 'todo', category: 'Testing', details: 'Run: SELECT COUNT(*) FROM documents;', priority: 'medium' },
    { id: 20, title: 'Activate Workflow', status: 'todo', category: 'Testing', details: 'Toggle workflow Active', priority: 'high' },
    { id: 21, title: 'Test Query Webhook', status: 'todo', category: 'Testing', details: 'curl -X POST localhost:5678/webhook/rag-query', priority: 'high' },
    
    // Optional
    { id: 22, title: 'Adjust Chunk Size', status: 'todo', category: 'Optional', details: 'Optimize chunking parameters', priority: 'low' },
    { id: 23, title: 'Docker Compose Setup', status: 'todo', category: 'Optional', details: 'Create docker-compose.yml', priority: 'low' }
  ];

  const [tasks, setTasks] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rag-kanban-tasks');
      return saved ? JSON.parse(saved) : initialTasks;
    }
    return initialTasks;
  });

  const [draggedTask, setDraggedTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rag-kanban-tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const columns = ['todo', 'in-progress', 'done'];
  const columnConfig = {
    'todo': { name: 'To Do', icon: Circle, color: 'text-gray-600', bg: 'bg-gray-50' },
    'in-progress': { name: 'In Progress', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    'done': { name: 'Done', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' }
  };

  const categoryColors = {
    'Prerequisites': 'bg-purple-500',
    'Supabase': 'bg-emerald-500',
    'Google Drive': 'bg-blue-500',
    'n8n Config': 'bg-orange-500',
    'Workflow': 'bg-pink-500',
    'Database': 'bg-teal-500',
    'Testing': 'bg-indigo-500',
    'Optional': 'bg-gray-400'
  };

  const priorityColors = {
    'high': 'bg-red-500',
    'medium': 'bg-yellow-500',
    'low': 'bg-gray-400'
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = (e) => {
    setDraggedTask(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== newStatus) {
      setTasks(tasks.map(task => 
        task.id === draggedTask.id ? { ...task, status: newStatus } : task
      ));
    }
  };

  const getProgress = () => {
    const done = tasks.filter(t => t.status === 'done').length;
    return Math.round((done / tasks.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Compact Header */}
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl border border-white/20 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                RAG Workflow Setup
              </h1>
              <p className="text-sm text-gray-600">
                Drag cards between columns to track your progress
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {getProgress()}%
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {tasks.filter(t => t.status === 'done').length} of {tasks.length} completed
              </div>
            </div>
          </div>
          
          <div className="mt-4 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-500 shadow-lg"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </div>

        {/* Kanban Board - Horizontal Columns */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map(column => {
            const Icon = columnConfig[column].icon;
            const columnTasks = tasks.filter(t => t.status === column);
            
            return (
              <div 
                key={column} 
                className="flex-shrink-0 w-80"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column)}
              >
                {/* Column Header */}
                <div className={`${columnConfig[column].bg} backdrop-blur rounded-xl p-4 mb-3 border border-white/20 shadow-lg`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${columnConfig[column].color}`} />
                      <h2 className="font-bold text-gray-800">
                        {columnConfig[column].name}
                      </h2>
                    </div>
                    <span className="bg-white/80 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                      {columnTasks.length}
                    </span>
                  </div>
                </div>

                {/* Cards Container */}
                <div className="space-y-2 min-h-[500px]">
                  {columnTasks.map(task => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      onDragEnd={handleDragEnd}
                      onClick={() => setSelectedTask(task)}
                      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer border-l-4 group relative"
                      style={{ borderLeftColor: categoryColors[task.category] || '#888' }}
                    >
                      {/* Drag Handle */}
                      <div className="absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <GripVertical className="w-4 h-4 text-gray-400" />
                      </div>

                      <div className="p-3 pl-8">
                        {/* Title */}
                        <h3 className="font-semibold text-gray-800 text-sm mb-2 leading-tight">
                          {task.title}
                        </h3>

                        {/* Badges Row */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {/* Category Badge */}
                          <span 
                            className={`text-xs px-2 py-0.5 rounded text-white ${categoryColors[task.category]}`}
                          >
                            {task.category}
                          </span>

                          {/* Priority Dot */}
                          <div 
                            className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`}
                            title={task.priority + ' priority'}
                          />
                        </div>
                      </div>

                      {/* Hover Indicator */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 rounded-lg transition-all pointer-events-none" />
                    </div>
                  ))}

                  {/* Empty State */}
                  {columnTasks.length === 0 && (
                    <div className="flex items-center justify-center h-40 border-2 border-dashed border-gray-300/50 rounded-lg bg-white/30 backdrop-blur">
                      <p className="text-gray-400 text-sm">Drop here</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl border border-white/20 p-4 mt-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold text-gray-700">Categories:</span>
              {Object.entries(categoryColors).map(([cat, color]) => (
                <div key={cat} className="flex items-center gap-1.5">
                  <div className={`w-3 h-3 rounded ${color}`} />
                  <span className="text-xs text-gray-600">{cat}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">Priority:</span>
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-xs text-gray-600">High</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="text-xs text-gray-600">Med</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  <span className="text-xs text-gray-600">Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedTask(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 border-l-8"
            style={{ borderLeftColor: categoryColors[selectedTask.category] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-1 rounded text-white ${categoryColors[selectedTask.category]}`}>
                    {selectedTask.category}
                  </span>
                  <div className={`w-3 h-3 rounded-full ${priorityColors[selectedTask.priority]}`} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedTask.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Details */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Instructions:</h3>
              <p className="text-sm text-gray-800 font-mono leading-relaxed">
                {selectedTask.details}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setTasks(tasks.map(t => t.id === selectedTask.id ? { ...t, status: 'todo' } : t));
                  setSelectedTask(null);
                }}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
              >
                Move to To Do
              </button>
              <button
                onClick={() => {
                  setTasks(tasks.map(t => t.id === selectedTask.id ? { ...t, status: 'in-progress' } : t));
                  setSelectedTask(null);
                }}
                className="flex-1 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-colors"
              >
                Move to In Progress
              </button>
              <button
                onClick={() => {
                  setTasks(tasks.map(t => t.id === selectedTask.id ? { ...t, status: 'done' } : t));
                  setSelectedTask(null);
                }}
                className="flex-1 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg text-sm font-medium transition-colors"
              >
                Mark as Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
