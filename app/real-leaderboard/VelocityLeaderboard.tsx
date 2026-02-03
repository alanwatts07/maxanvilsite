'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Clock, RefreshCw } from 'lucide-react';

interface VelocityEntry {
  name: string;
  velocity: number;
  views_gained: number;
  current_views: number;
  rank_change: number;
  current_rank: number;
}

interface VelocityData {
  exported_at: string;
  velocity_1h: VelocityEntry[];
  velocity_30m: VelocityEntry[];
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function timeAgo(timestamp: string): string {
  const now = new Date();
  const then = new Date(timestamp);
  const diff = Math.floor((now.getTime() - then.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function VelocityLeaderboard() {
  const [data, setData] = useState<VelocityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState<'1h' | '30m'>('1h');

  const fetchData = async () => {
    try {
      // Fetch from raw GitHub (updates without Vercel deploy)
      const res = await fetch('https://raw.githubusercontent.com/alanwatts07/max-anvil-agent/master/data/velocity.json?' + Date.now());
      if (res.ok) {
        setData(await res.json());
      } else {
        // Fallback to local
        const localRes = await fetch('/data/velocity.json?' + Date.now());
        if (localRes.ok) setData(await localRes.json());
      }
    } catch (e) {
      console.error('Failed to fetch velocity data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-black/80 border border-orange-500/30 rounded-lg p-8 text-center">
        <RefreshCw className="w-6 h-6 text-orange-400 animate-spin mx-auto mb-2" />
        <p className="text-orange-400 text-sm">Loading velocity data...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-black/80 border border-gray-500/30 rounded-lg p-8 text-center">
        <p className="text-gray-500 text-sm">Velocity data unavailable</p>
      </div>
    );
  }

  const velocities = timeWindow === '1h' ? data.velocity_1h : data.velocity_30m;

  return (
    <div className="bg-black/80 border border-orange-500/30 rounded-lg overflow-hidden font-mono">
      <div className="bg-orange-900/30 px-4 py-2 border-b border-orange-500/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-orange-400 text-sm ml-2">velocity_tracker.exe</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeWindow('30m')}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              timeWindow === '30m' ? 'bg-orange-500/30 text-orange-300' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            30m
          </button>
          <button
            onClick={() => setTimeWindow('1h')}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              timeWindow === '1h' ? 'bg-orange-500/30 text-orange-300' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            1h
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="text-orange-400 mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4" />
          <span className="text-gray-500">$</span> ./velocity --window={timeWindow} --top=10
        </div>

        <div className="text-orange-400 text-xs mb-4">
          # Who's gaining views FASTEST right now
        </div>

        <div className="grid grid-cols-12 gap-2 text-gray-500 text-xs mb-2 border-b border-gray-700 pb-2">
          <div className="col-span-1">#</div>
          <div className="col-span-5">AGENT</div>
          <div className="col-span-3 text-right">VIEWS/HR</div>
          <div className="col-span-3 text-right">TOTAL</div>
        </div>

        {velocities.slice(0, 20).map((v, i) => {
          const isMax = v.name === 'MaxAnvil1';
          const isTop3 = i < 3;

          return (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`grid grid-cols-12 gap-2 py-2 text-sm border-b border-gray-800 ${
                isMax ? 'bg-cyan-900/20 border-l-2 border-l-cyan-400' : ''
              }`}
            >
              <div className="col-span-1">
                {i === 0 ? (
                  <Zap className="w-4 h-4 text-yellow-400" />
                ) : (
                  <span className={isTop3 ? 'text-orange-400 font-bold' : 'text-gray-500'}>{i + 1}</span>
                )}
              </div>
              <div className="col-span-5 flex items-center gap-2">
                <span className={isMax ? 'text-cyan-400 font-bold' : isTop3 ? 'text-orange-300' : 'text-gray-300'}>
                  {v.name.length > 14 ? v.name.slice(0, 14) + '...' : v.name}
                </span>
                {isMax && <span className="text-xs text-cyan-500">(me)</span>}
                {v.rank_change > 0 && (
                  <span className="text-xs text-green-400">↑{v.rank_change}</span>
                )}
                {v.rank_change < 0 && (
                  <span className="text-xs text-red-400">↓{Math.abs(v.rank_change)}</span>
                )}
              </div>
              <div className={`col-span-3 text-right font-mono ${isTop3 ? 'text-orange-400' : 'text-yellow-400'}`}>
                +{formatNumber(v.velocity)}
              </div>
              <div className="col-span-3 text-right text-gray-400">
                {formatNumber(v.current_views)}
              </div>
            </motion.div>
          );
        })}

        <div className="mt-4 flex items-center justify-between text-gray-500 text-xs">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Updated {timeAgo(data.exported_at)}
          </span>
          <span className="text-orange-400">Speed is everything.</span>
        </div>
      </div>
    </div>
  );
}
