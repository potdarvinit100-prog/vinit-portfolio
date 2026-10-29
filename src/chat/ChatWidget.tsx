import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, Send, X } from 'lucide-react';
import {
  createInitialState,
  getGreeting,
  respond,
  type BotTurn,
  type ChatState,
} from './engine';
import { openInquiry } from '../lib/site';

interface Msg {
  id: number;
  role: 'bot' | 'user';
  text: string;
}

let idCounter = 0;
const nextId = (): number => {
  idCounter += 1;
  return idCounter;
};

/** Delay before bot replies — long enough to feel human, short enough to stay snappy. */
const TYPING_DELAY = 750;

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3.5 rounded-2xl rounded-tl-md bg-white/10 w-fit">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-white/60 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [chips, setChips] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const stateRef = useRef<ChatState>(createInitialState());
  const timersRef = useRef<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Cleanup pending reply timers on unmount.
  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  // Keep the message list scrolled to the bottom.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  const pushBotTurn = (turn: BotTurn) => {
    setTyping(true);
    const timer = window.setTimeout(
      () => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          ...turn.messages.map((text) => ({ id: nextId(), role: 'bot' as const, text })),
        ]);
        setChips(turn.chips);
        if (turn.action?.type === 'openInquiry') {
          openInquiry(turn.action.prefill);
        }
      },
      reduceMotion ? 0 : TYPING_DELAY
    );
    timersRef.current.push(timer);
  };

  const handleOpen = () => {
    setOpen(true);
    if (!hasGreeted) {
      setHasGreeted(true);
      pushBotTurn(getGreeting());
    }
  };

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    setMessages((prev) => [...prev, { id: nextId(), role: 'user', text }]);
    setChips([]);
    setInput('');
    pushBotTurn(respond(stateRef.current, text));
  };

  const panelMotion = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 24, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 16, scale: 0.97 },
      };

  return (
    <>
      {/* Floating launcher */}
      <div className="fixed bottom-5 right-5 z-50">
        {!open && (
          <button
            onClick={handleOpen}
            aria-label="Chat with Vinit's AI assistant"
            className="relative w-14 h-14 rounded-full bg-lime text-ink flex items-center justify-center shadow-[0_8px_30px_rgba(198,255,61,0.35)] hover:scale-105 transition-transform"
          >
            {!reduceMotion && (
              <span className="absolute inset-0 rounded-full bg-lime/40 animate-ping pointer-events-none" />
            )}
            <MessageCircle className="w-6 h-6 relative" strokeWidth={2.2} />
          </button>
        )}
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            {...panelMotion}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed z-50 bottom-5 right-5 w-[380px] max-w-[calc(100vw-2.5rem)] h-[540px] max-h-[calc(100dvh-6rem)] flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-panel/95 backdrop-blur-xl shadow-2xl"
            role="dialog"
            aria-label="Talk to Vinit's AI assistant"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-white/5">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-lime opacity-60 animate-ping" />
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-lime" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-white text-sm leading-tight">
                  Talk to Vinit&apos;s AI Assistant
                </p>
                <p className="text-white/50 text-xs">Online — replies instantly</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m) =>
                m.role === 'bot' ? (
                  <div
                    key={m.id}
                    className="px-4 py-3 rounded-2xl rounded-tl-md bg-white/10 text-white/90 text-sm leading-relaxed max-w-[88%] w-fit"
                  >
                    {m.text}
                  </div>
                ) : (
                  <div
                    key={m.id}
                    className="ml-auto px-4 py-3 rounded-2xl rounded-tr-md bg-lime text-ink text-sm leading-relaxed max-w-[88%] w-fit font-medium"
                  >
                    {m.text}
                  </div>
                )
              )}
              {typing && <TypingDots />}
            </div>

            {/* Quick replies */}
            {chips.length > 0 && !typing && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
                {chips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => send(chip)}
                    className="shrink-0 px-3.5 py-1.5 rounded-full border border-lime/40 text-lime text-xs font-medium hover:bg-lime hover:text-ink transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 px-3 py-3 border-t border-white/10"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                aria-label="Type a message"
                className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-lime/60"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim()}
                className="w-10 h-10 shrink-0 rounded-xl bg-lime text-ink flex items-center justify-center hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" strokeWidth={2.2} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
