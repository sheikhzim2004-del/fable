'use client'
import { motion } from 'framer-motion';
import { House, Book} from '@gravity-ui/icons';
import Link from 'next/link';

export default function NotFoundPage() {

  const pages = [
    { char: '4', accent: 'var(--primary)', delay: 0, x: -92, rotate: -8 },
    { char: '0', accent: 'var(--secondary)', delay: 0.15, x: 0, rotate: 4 },
    { char: '4', accent: 'var(--primary)', delay: 0.3, x: 92, rotate: -5 },
  ];

  const motes = Array.from({ length: 7 }).map((_, i) => ({
    id: i,
    left: 8 + i * 13 + (i % 2) * 4,
    top: 10 + ((i * 17) % 60),
    size: 3 + (i % 3),
    delay: i * 0.4,
    color: i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)',
  }));

  return (
    <div>

      <div
        className="fable-sans relative min-h-[650px] w-full overflow-hidden flex items-center justify-center px-6 py-20 transition-colors duration-300"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div
          className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-30 blur-[110px]"
          style={{ background: 'var(--primary)' }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full opacity-20 blur-[100px]"
          style={{ background: 'var(--secondary)' }}
        />


        {motes.map((m) => (
          <motion.span
            key={m.id}
            className="pointer-events-none absolute rounded-full"
            style={{ left: `${m.left}%`, top: `${m.top}%`, width: m.size, height: m.size, background: m.color }}
            animate={{ y: [0, -18, 0], opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: 4 + (m.id % 3), repeat: Infinity, delay: m.delay, ease: 'easeInOut' }}
          />
        ))}

        <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
          <div className="relative mb-8 h-[150px] w-[280px]">
            {pages.map((p, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 flex h-[104px] w-[78px] items-center justify-center rounded-[3px] border shadow-xl fable-serif text-4xl font-semibold"
                style={{
                  marginLeft: p.x - 39,
                  marginTop: -52,
                  background: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                  color: p.accent,
                  clipPath: 'polygon(0 0, 82% 0, 100% 18%, 100% 100%, 0 100%)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [0, -10, 0], rotate: [p.rotate, p.rotate + 3, p.rotate] }}
                transition={{
                  opacity: { duration: 0.5, delay: p.delay },
                  y: { duration: 3.4, repeat: Infinity, delay: p.delay, ease: 'easeInOut' },
                  rotate: { duration: 3.4, repeat: Infinity, delay: p.delay, ease: 'easeInOut' },
                }}
              >
                {p.char}
                <span
                  className="absolute top-0 right-0 h-[18px] w-[18px]"
                  style={{ background: 'var(--bg-primary)', clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
                />
              </motion.div>
            ))}

            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <svg width="150" height="46" viewBox="0 0 150 46" fill="none">
                <path d="M75 10 L8 4 C4 3.6 2 6 2 9 L2 40 C2 42.5 4 44.3 7 44.6 L75 40 Z" fill="var(--bg-secondary)" stroke="var(--border-color)" strokeWidth="1.2" />
                <path d="M75 10 L142 4 C146 3.6 148 6 148 9 L148 40 C148 42.5 146 44.3 143 44.6 L75 40 Z" fill="var(--bg-secondary)" stroke="var(--border-color)" strokeWidth="1.2" />
                <line x1="75" y1="10" x2="75" y2="40" stroke="var(--border-color)" strokeWidth="1.2" />
                <line x1="14" y1="14" x2="62" y2="12" stroke="var(--text-secondary)" strokeWidth="1" opacity="0.4" />
                <line x1="14" y1="20" x2="62" y2="18" stroke="var(--text-secondary)" strokeWidth="1" opacity="0.4" />
                <line x1="88" y1="12" x2="136" y2="14" stroke="var(--text-secondary)" strokeWidth="1" opacity="0.4" />
                <line x1="88" y1="18" x2="136" y2="20" stroke="var(--text-secondary)" strokeWidth="1" opacity="0.4" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute left-1/2 top-[-4px] -translate-x-1/2 origin-top"
              initial={{ y: -60, rotate: 0 }}
              animate={{ y: 0, rotate: [-4, 4, -4] }}
              transition={{
                y: { type: 'spring', stiffness: 90, damping: 9, delay: 0.9 },
                rotate: { duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 1.6 },
              }}
            >
              <svg width="14" height="52" viewBox="0 0 14 52" fill="none">
                <path d="M0 0 H14 V44 L7 36 L0 44 Z" fill="var(--secondary)" />
              </svg>
            </motion.div>
          </div>

          <span className="fable-sans mb-3 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: 'var(--secondary)' }}>
            Error 404
          </span>

          <h1 className="fable-serif mb-3 text-[2.4rem] leading-tight font-medium" style={{ color: 'var(--text-primary)' }}>
            Page Not Found
          </h1>

          <p className="mb-9 text-[15px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            This page slipped out of the book. It may have been moved, renamed, or maybe it was never written at all.
          </p>

          <motion.a
            href="/"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="fable-sans mb-4 inline-flex items-center gap-2 rounded-full px-7 py-3 text-[14px] font-semibold text-white shadow-lg"
            style={{ background: 'var(--primary)' }}
          >
            <House width={16} height={16} />
            Go Home
          </motion.a>

          <Link
            href="/ebooks"
            className="fable-sans inline-flex items-center gap-1.5 text-[13px] font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            <Book width={13} height={13} />
            Browse ebooks instead
          </Link>
        </div>
      </div>
    </div>
  );
}
