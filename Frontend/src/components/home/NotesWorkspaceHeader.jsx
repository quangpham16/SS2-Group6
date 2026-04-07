import { Book, Plus } from 'lucide-react';

const NotesWorkspaceHeader = ({ title, onUploadClick }) => {
  return (
    <header className="mb-5 flex flex-col gap-4 rounded-[28px] bg-[#111111] px-5 py-4 shadow-[0_20px_45px_rgba(0,0,0,0.22)] lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
          <Book size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-white">
            {title || 'AINotes Workspace'}
          </h1>
          <p className="mt-1 text-sm text-neutral-400">
            Upload, organize, and study your course materials in one place.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onUploadClick}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
        >
          <Plus size={16} />
          Create notebook
        </button>
      </div>
    </header>
  );
};

export default NotesWorkspaceHeader;
