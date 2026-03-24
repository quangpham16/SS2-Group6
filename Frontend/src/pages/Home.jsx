import {
  Bell,
  Book,
  HelpCircle,
  Home as HomeIcon,
  LogOut,
  Plus,
  Search,
  Settings,
  Trash2,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: HomeIcon, active: true },
  { label: 'My notes', icon: Book, active: false },
  { label: 'Trash', icon: Trash2, active: false },
  { label: 'Settings', icon: Settings, active: false },
];


const Home = ({ user, onLogout }) => {
  const initials = user?.fullName
    ? user.fullName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('')
    : 'AI';

  return (
    <div className="min-h-screen bg-[#ECEEF6] text-gray-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b border-white/60 bg-[#101426] px-6 py-8 text-white lg:w-[290px] lg:border-b-0 lg:border-r lg:border-r-white/5">
          <div className="flex items-center justify-between lg:block">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#8D98D3]">AINOTES</p>
            </div>
            <button className="inline-flex items-center gap-3 rounded-xl bg-[#101426] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1A2038]">
                  <Plus size={16} />
                  New Note
                </button>
          </div>

          <nav className="mt-8 space-y-2 lg:mt-12">
            {navItems.map(({ label, icon: Icon, active }) => (
              <button
                key={label}
                type="button"
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  active
                    ? 'bg-[#6B7AE4] text-white shadow-[0_18px_30px_rgba(107,122,228,0.28)]'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </nav>    
        </aside>

        <main className="flex-1 overflow-hidden bg-[#F8F9FA]">
          <header className="flex flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div className="relative w-full lg:w-[400px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search your thoughts..."
                className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-12 pr-4 text-sm shadow-sm transition-all focus:border-[#6B7AE4] focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between gap-5 lg:justify-end">
              <div className="flex items-center gap-5 text-gray-500">
                <button className="transition-colors hover:text-gray-900">
                  <Bell size={20} />
                </button>
                <button className="transition-colors hover:text-gray-900">
                  <HelpCircle size={20} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-bold text-gray-900">{user?.fullName || 'AINotes User'}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                >
                  <LogOut size={16} />
                  Logout
                </button>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-sm font-bold text-white">
                  {initials}
                </div>
              </div>
            </div>
          </header>

          <div className="h-[calc(100vh-104px)] overflow-y-auto px-6 pb-10 lg:px-10">
            <div className="mb-8 flex flex-col gap-6 xl:flex-row">
              <div className="flex-1 overflow-hidden rounded-3xl border border-[#DCE1FF] bg-[#EEF0FF] p-8">
                <div className="mb-4 flex items-center gap-2 text-xs font-bold tracking-wider text-[#6B7AE4]">
                </div>
                <div className="flex flex-wrap gap-4">
                </div>
              </div>

              <div className="w-full rounded-3xl border border-gray-100 bg-white p-8 shadow-sm xl:w-80">
                <div className="space-y-5">
                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-gray-100">
                      
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-sm">
    
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-gray-100">                    
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-gray-100 pt-6">
                </div>
              </div>
            </div>

            <section>
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Recent Notes</h3>
                </div>

                
              </div>

              <div className="grid gap-5 lg:grid-cols-3">
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
