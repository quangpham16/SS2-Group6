import { Plus } from 'lucide-react';

import NotebookWorkspace from './NotebookWorkspace';

const MyNotesPage = ({
  user,
  initials,
  onLogout,
  onUploadClick,
  recentDocuments,
  activeDocument,
  onSelectDocument,
  documentsError,
}) => {
  const hasDocuments = recentDocuments.length > 0;

  if (hasDocuments) {
    return (
      <NotebookWorkspace
        user={user}
        initials={initials}
        onLogout={onLogout}
        onUploadClick={onUploadClick}
        recentDocuments={recentDocuments}
        activeDocument={activeDocument}
        onSelectDocument={onSelectDocument}
      />
    );
  }

  return (
    <section className="px-6 py-8 lg:px-10 lg:py-10">
      <div className="rounded-[36px] border border-neutral-200 bg-white p-8 shadow-sm lg:p-12">
        <h1 className="text-3xl font-bold text-black">My notes</h1>
        <p className="mt-4 text-lg leading-8 text-neutral-600">
          {documentsError || 'No notes yet. Upload your first document to create a notebook.'}
        </p>
        <button
          type="button"
          onClick={onUploadClick}
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          <Plus size={18} />
          Upload Your Document
        </button>
      </div>
    </section>
  );
};

export default MyNotesPage;
