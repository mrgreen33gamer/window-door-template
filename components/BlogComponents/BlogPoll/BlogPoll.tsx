'use client';
// components/BlogComponents/BlogPoll/BlogPoll.tsx
//
// USAGE:
//   <BlogPoll
//     pollId="data-center-waco-2026"
//     question="What factor matters most when choosing a data center location?"
//     options={['Power reliability', 'Fiber connectivity', 'Land/lease cost', 'Local incentives']}
//   />

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles.module.scss';

interface BlogPollProps {
  pollId: string;
  question: string;
  options: string[];
}

interface PollResult {
  votes: Record<string, number>;
  total: number;
}

export default function BlogPoll({ pollId, question, options }: BlogPollProps) {
  const [phase, setPhase]       = useState<'voting' | 'results'>('voting');
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult]     = useState<PollResult>({ votes: {}, total: 0 });
  const [loading, setLoading]   = useState(false);
  const [initDone, setInitDone] = useState(false);

  // On mount — check if user already voted (cookie exists → GET shows results)
  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch(`/api/poll?pollId=${encodeURIComponent(pollId)}`);
        const data = await res.json();
        setResult({ votes: data.votes ?? {}, total: data.total ?? 0 });
      } catch {
        // silently ignore — show poll form
      } finally {
        setInitDone(true);
      }
    })();

    // Check dedup cookie in JS (mirrors the HTTP-only cookie set server-side —
    // this JS cookie is set below as a UX hint only)
    const voted = document.cookie.split(';').find(c => c.trim().startsWith(`voted_${pollId}=`));
    if (voted) {
      const choice = voted.split('=')[1]?.trim();
      setSelected(choice ?? null);
      setPhase('results');
    }
  }, [pollId]);

  const handleVote = async (option: string) => {
    if (loading || phase === 'results') return;
    setLoading(true);
    setSelected(option);

    try {
      const res  = await fetch('/api/poll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pollId, option }),
      });
      const data = await res.json();
      setResult({ votes: data.votes ?? {}, total: data.total ?? 0 });

      // Set a JS-readable cookie as a UX hint (the server sets the real HTTP-only one)
      document.cookie = `voted_${pollId}=${encodeURIComponent(option)};max-age=${60 * 60 * 24 * 30};path=/;samesite=lax`;

      setPhase('results');
    } catch {
      setSelected(null);
    } finally {
      setLoading(false);
    }
  };

  const pct = (opt: string) => {
    if (!result.total) return 0;
    return Math.round(((result.votes[opt] ?? 0) / result.total) * 100);
  };

  if (!initDone) return null;

  return (
    <motion.section
      className={styles.root}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      aria-label="Reader poll"
    >
      <span className={styles.eyebrow}>Quick Poll</span>
      <h3 className={styles.question}>{question}</h3>

      <AnimatePresence mode="wait">
        {phase === 'voting' ? (
          <motion.div
            key="voting"
            className={styles.options}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {options.map(opt => (
              <button
                key={opt}
                className={`${styles.optBtn} ${selected === opt ? styles.optSelected : ''}`}
                onClick={() => handleVote(opt)}
                disabled={loading}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="results"
            className={styles.results}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {options.map((opt, i) => {
              const p = pct(opt);
              const isYours = opt === selected;
              return (
                <motion.div
                  key={opt}
                  className={`${styles.bar} ${isYours ? styles.barYours : ''}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.38 }}
                >
                  <div className={styles.barHeader}>
                    <span className={styles.barLabel}>
                      {isYours && <span className={styles.yourTag}>Your vote · </span>}
                      {opt}
                    </span>
                    <span className={styles.barPct}>{p}%</span>
                  </div>
                  <div className={styles.barTrack}>
                    <motion.div
                      className={styles.barFill}
                      initial={{ width: 0 }}
                      animate={{ width: `${p}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.07 + 0.1 }}
                    />
                  </div>
                </motion.div>
              );
            })}

            <p className={styles.totalNote}>
              {result.total} {result.total === 1 ? 'vote' : 'votes'} cast
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}