import { Share2 } from 'lucide-react';

const NotesChatPanel = ({
  activeDocument,
  recentDocuments,
  messages,
  isLoadingHistory,
  question,
  onQuestionChange,
  onAskAi,
  isAsking,
}) => {
  const canAsk = Boolean(activeDocument && question.trim() && !isAsking);

  return (
    <section className="min-h-[680px] rounded-[28px] bg-[#111111]">
      <div className="flex items-center justify-between border-b border-white/6 px-5 py-4">
        <h2 className="text-3xl">Chat</h2>
        <button
          type="button"
          className="rounded-full p-2 text-neutral-400 transition hover:bg-white/5 hover:text-white"
        >
        </button>
      </div>

      <div className="flex h-[calc(100%-76px)] flex-col px-5 py-5">
        <div className="flex-1 overflow-y-auto">
          {isLoadingHistory && (
            <div className="rounded-[24px] bg-[#181818] px-4 py-3 text-sm text-neutral-400">
              Loading chat history...
            </div>
          )}
          {messages.length > 0 && (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[85%] rounded-[24px] px-4 py-3 text-sm leading-7 ${
                    message.role === 'user'
                      ? 'ml-auto bg-white text-black'
                      : 'bg-[#181818] text-neutral-200'
                  }`}
                >
                  {message.content}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 rounded-[24px] border border-white/6 bg-[#181818] px-5 py-4">
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1">
              <textarea
                value={question}
                onChange={(event) => onQuestionChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    if (canAsk) {
                      onAskAi();
                    }
                  }
                }}
                placeholder={activeDocument ? 'Ask AI about this document...' : 'Select a document first...'}
                disabled={!activeDocument || isAsking}
                className="min-h-[88px] w-full resize-none bg-transparent text-lg text-white outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:text-neutral-500"
              />
              <p className="mt-2 text-xs text-neutral-500">
                Press Enter to ask, Shift+Enter for a new line.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-500">{recentDocuments.length} source</span>
              <button
                type="button"
                onClick={onAskAi}
                disabled={!canAsk}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:bg-neutral-500 disabled:text-neutral-800"
              >
                <Share2 size={18} />
                {isAsking ? 'Asking...' : 'Ask AI'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotesChatPanel;
