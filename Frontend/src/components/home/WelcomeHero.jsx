import { Clock3, FileText, Plus } from 'lucide-react';

import AppHeader from './AppHeader';
import { formatFileSize, formatUploadedAt } from './utils';

const WelcomeHero = ({
  user,
  initials,
  onLogout,
  onUploadClick,
  recentDocuments,
  onOpenDocument,
}) => {
  const hasRecentDocuments = recentDocuments.length > 0;

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <AppHeader user={user} initials={initials} onLogout={onLogout} />

      <section className="mt-8 overflow-hidden rounded-[36px] border border-neutral-200    p-8 shadow-[0_30px_80px_rgba(0,0,0,0.10)] lg:p-12">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-white lg:text-black">Welcome</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-white lg:text-black">
            AI study notes, source organization, and a smarter workspace for your documents.
          </h1>
          <p className="mt-5 text-lg leading-8 text-neutral-300 lg:text-neutral-600">
            AINOTES helps students upload course files, keep sources organized, and prepare for AI-powered note generation. Start by uploading your first document from the New Note button.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onUploadClick}
              className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition hover:bg-neutral-200"
            >
              <Plus size={18} />
              Upload Your Document
            </button>
            <div className="inline-flex items-center gap-3 rounded-full border border-neutral-300 bg-white px-5 py-4 text-sm font-semibold text-neutral-700">
              <FileText size={18} className="text-black" />
              Supports PDF, DOC, DOCX, TXT
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[32px] border border-neutral-200 bg-white/90 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500">Recent Documents</p>
              <h2 className="mt-2 text-2xl font-bold text-black">Your latest uploads</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">
              <Clock3 size={16} />
              {recentDocuments.length} document{recentDocuments.length === 1 ? '' : 's'}
            </div>
          </div>

          {hasRecentDocuments ? (
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {recentDocuments.slice(0, 6).map((document) => (
                <button
                  key={document.fileName}
                  type="button"
                  onClick={() => onOpenDocument(document)}
                  className="rounded-[28px] border border-neutral-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                    <FileText size={20} />
                  </div>
                  <p className="mt-5 truncate text-lg font-semibold text-black">
                    {document.originalName}
                  </p>
                  <p className="mt-2 text-sm text-neutral-500">
                    Uploaded {formatUploadedAt(document.uploadedAt)}
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">
                    {formatFileSize(document.size)}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-[28px] border border-dashed border-neutral-300 bg-neutral-50 p-6">
              <p className="text-lg font-semibold text-black">No recent documents yet</p>
              <p className="mt-2 text-neutral-600">
                Upload a file and it will appear here on the dashboard.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default WelcomeHero;
