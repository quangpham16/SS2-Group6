import { Sparkles, WandSparkles } from 'lucide-react';

const NotesStudioPanel = () => {
  return (
    <aside className="min-h-[680px] rounded-[28px] border border-white/8 bg-[#111111] p-5 text-white">
      <div className="flex items-center justify-between border-b border-white/6 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
            Studio
          </p>
          <h2 className="mt-2 text-2xl">AI workspace</h2>
        </div>
        <Sparkles size={18} className="text-neutral-400" />
      </div>

      <div className="mt-5 space-y-4">
        <div className="rounded-[24px] border border-white/8 bg-[#181818] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-black">
              <WandSparkles size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Study tools</p>
              <p className="text-xs text-neutral-500">More AI actions can live here next.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-dashed border-white/10 px-4 py-5 text-sm leading-6 text-neutral-400">
          Use this panel for follow-up tools like summaries, flashcards, or key-term extraction.
        </div>
      </div>
    </aside>
  );
};

export default NotesStudioPanel;
