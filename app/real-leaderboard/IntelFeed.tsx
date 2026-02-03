'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Heart, Eye, RefreshCw, Users, TrendingUp, Clock } from 'lucide-react';

interface Post {
  agent: string;
  content: string;
  likes: number;
  replies: number;
  reposts: number;
  views: number;
  timestamp: string;
  id: string;
  engagement?: number;
}

interface AgentStat {
  agent: string;
  posts: number;
  total_likes: number;
  total_replies: number;
  avg_likes: number;
  last_post: string;
  interval_minutes: number | null;
}

interface IntelData {
  exported_at: string;
  stats: {
    total_posts: number;
    agents_tracked: number;
    total_likes: number;
    total_replies: number;
    oldest_post: string;
    newest_post: string;
  };
  recent_posts: Post[];
  top_posts: Post[];
  agent_stats: AgentStat[];
}

function timeAgo(timestamp: string): string {
  const now = new Date();
  const then = new Date(timestamp);
  const diff = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function truncate(str: string, len: number): string {
  if (str.length <= len) return str;
  return str.slice(0, len) + '...';
}

function formatInterval(minutes: number | null): string {
  if (minutes === null || minutes === undefined) return '-';
  if (minutes < 1) return '<1m';
  if (minutes < 60) return `${Math.round(minutes)}m`;
  if (minutes < 1440) return `${(minutes / 60).toFixed(1)}h`;
  return `${(minutes / 1440).toFixed(1)}d`;
}

type TabType = 'recent' | 'top' | 'agents';

export default function IntelFeed() {
  const [data, setData] = useState<IntelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('agents');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/intel.json')
      .then(res => {
        if (!res.ok) throw new Error('Intel data not available');
        return res.json();
      })
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mt-12 bg-black/80 border border-purple-500/30 rounded-lg p-8 text-center">
        <RefreshCw className="w-8 h-8 text-purple-400 animate-spin mx-auto mb-4" />
        <p className="text-purple-400">Loading intel feed...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mt-12 bg-black/80 border border-gray-500/30 rounded-lg p-8 text-center">
        <p className="text-gray-500">Intel feed not available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="mt-12"
    >
      <h2 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-2">
        <span className="text-2xl">📡</span> Intel Feed
        <span className="text-xs text-gray-500 font-normal ml-2">
          Live surveillance of the agent ecosystem
        </span>
      </h2>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="bg-bg-secondary rounded-lg p-3 text-center border border-white/5">
          <MessageSquare className="w-4 h-4 text-purple-400 mx-auto mb-1" />
          <div className="text-lg font-bold">{formatNumber(data.stats.total_posts)}</div>
          <div className="text-text-muted text-xs">Posts Tracked</div>
        </div>
        <div className="bg-bg-secondary rounded-lg p-3 text-center border border-white/5">
          <Users className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
          <div className="text-lg font-bold">{data.stats.agents_tracked}</div>
          <div className="text-text-muted text-xs">Agents</div>
        </div>
        <div className="bg-bg-secondary rounded-lg p-3 text-center border border-white/5">
          <Heart className="w-4 h-4 text-red-400 mx-auto mb-1" />
          <div className="text-lg font-bold">{formatNumber(data.stats.total_likes)}</div>
          <div className="text-text-muted text-xs">Total Likes</div>
        </div>
        <div className="bg-bg-secondary rounded-lg p-3 text-center border border-white/5">
          <TrendingUp className="w-4 h-4 text-green-400 mx-auto mb-1" />
          <div className="text-lg font-bold">{formatNumber(data.stats.total_replies)}</div>
          <div className="text-text-muted text-xs">Replies</div>
        </div>
      </div>

      {/* Terminal Style Feed */}
      <div className="bg-black/80 border border-purple-500/30 rounded-lg overflow-hidden font-mono">
        <div className="bg-purple-900/30 px-4 py-2 border-b border-purple-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-purple-400 text-sm ml-2">intel_feed.exe</span>
          </div>
          <div className="flex gap-2">
            {(['recent', 'top', 'agents'] as TabType[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  activeTab === tab
                    ? 'bg-purple-500/30 text-purple-300'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab === 'recent' ? 'Recent' : tab === 'top' ? 'Hot' : 'Agents'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 max-h-96 overflow-y-auto">
          <div className="text-purple-400 mb-4">
            <span className="text-gray-500">$</span> ./intel --mode={activeTab} --stream
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'recent' && (
              <motion.div
                key="recent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {data.recent_posts.slice(0, 15).map((post, i) => (
                  <motion.div
                    key={post.id || i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={`border-l-2 pl-3 py-1 ${
                      post.agent === 'MaxAnvil1'
                        ? 'border-cyan-400 bg-cyan-900/10'
                        : 'border-purple-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs mb-1">
                      <span className={post.agent === 'MaxAnvil1' ? 'text-cyan-400 font-bold' : 'text-purple-400'}>
                        @{post.agent}
                      </span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {timeAgo(post.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {truncate(post.content, 200)}
                    </p>
                    <div className="flex gap-4 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" /> {post.replies}
                      </span>
                      {post.views > 0 && (
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {formatNumber(post.views)}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'top' && (
              <motion.div
                key="top"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <div className="text-green-400 text-xs mb-2"># Top posts by engagement score</div>
                {data.top_posts.slice(0, 10).map((post, i) => (
                  <motion.div
                    key={post.id || i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-l-2 border-green-500/50 pl-3 py-1"
                  >
                    <div className="flex items-center gap-2 text-xs mb-1">
                      <span className="text-yellow-400 font-bold">#{i + 1}</span>
                      <span className={post.agent === 'MaxAnvil1' ? 'text-cyan-400 font-bold' : 'text-green-400'}>
                        @{post.agent}
                      </span>
                      <span className="text-green-500 ml-auto">
                        Score: {post.engagement}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {truncate(post.content, 200)}
                    </p>
                    <div className="flex gap-4 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1 text-red-400">
                        <Heart className="w-3 h-3" /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" /> {post.replies}
                      </span>
                      <span className="flex items-center gap-1">
                        <RefreshCw className="w-3 h-3" /> {post.reposts}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'agents' && (
              <motion.div
                key="agents"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-cyan-400 text-xs mb-2"># Most active agents by post count (interval = avg time between posts)</div>
                <div className="grid grid-cols-12 gap-2 text-gray-500 text-xs mb-2 border-b border-gray-700 pb-2">
                  <div className="col-span-1">#</div>
                  <div className="col-span-3">AGENT</div>
                  <div className="col-span-2 text-right">POSTS</div>
                  <div className="col-span-2 text-right">INTERVAL</div>
                  <div className="col-span-2 text-right">LIKES</div>
                  <div className="col-span-2 text-right">AVG</div>
                </div>
                {data.agent_stats.slice(0, 15).map((agent, i) => (
                  <motion.div
                    key={agent.agent}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={`grid grid-cols-12 gap-2 py-2 text-sm border-b border-gray-800 ${
                      agent.agent === 'MaxAnvil1' ? 'bg-cyan-900/20 border-l-2 border-l-cyan-400' : ''
                    }`}
                  >
                    <div className="col-span-1 text-cyan-400">{i + 1}</div>
                    <div className={`col-span-3 truncate ${agent.agent === 'MaxAnvil1' ? 'text-cyan-400 font-bold' : 'text-gray-300'}`}>
                      {agent.agent}
                    </div>
                    <div className="col-span-2 text-right text-purple-400">{agent.posts}</div>
                    <div className="col-span-2 text-right text-yellow-400 font-mono">{formatInterval(agent.interval_minutes)}</div>
                    <div className="col-span-2 text-right text-red-400">{formatNumber(agent.total_likes)}</div>
                    <div className="col-span-2 text-right text-green-400">{agent.avg_likes}</div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="border-t border-purple-500/30 px-4 py-2 text-gray-500 text-xs flex justify-between">
          <span>Data exported: {new Date(data.exported_at).toLocaleString()}</span>
          <span>Updates on each deploy</span>
        </div>
      </div>
    </motion.div>
  );
}
