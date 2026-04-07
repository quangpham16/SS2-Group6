import { Bell, HelpCircle, LogOut, Search } from 'lucide-react';

const AppHeader = ({ user, initials, onLogout, dark = false }) => {
  const inputClassName = dark
    ? 'w-full rounded-full border border-white/10 bg-[#181818] py-2.5 pl-12 pr-4 text-sm text-white shadow-sm transition-all placeholder:text-neutral-500 focus:border-white focus:outline-none'
    : 'w-full rounded-full border border-neutral-300 bg-white py-2.5 pl-12 pr-4 text-sm shadow-sm transition-all focus:border-black focus:outline-none';

  const iconClassName = dark ? 'text-neutral-500' : 'text-neutral-400';
  const actionClassName = dark ? 'transition-colors hover:text-white' : 'transition-colors hover:text-gray-900';
  const logoutClassName = dark
    ? 'inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#181818] px-4 py-2 text-sm font-semibold text-neutral-200 transition hover:border-white/25 hover:bg-[#222222]'
    : 'inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 transition hover:border-neutral-400 hover:bg-neutral-100';
  const avatarClassName = dark
    ? 'flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-black'
    : 'flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white';
  const nameClassName = dark ? 'text-sm font-bold text-white' : 'text-sm font-bold text-gray-900';
  const emailClassName = dark ? 'text-xs text-neutral-400' : 'text-xs text-gray-500';

  return (
    <header className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:w-[400px]">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${iconClassName}`} size={18} />
        <input type="text" placeholder="Search your thoughts..." className={inputClassName} />
      </div>

      <div className="flex items-center justify-between gap-5 lg:justify-end">
        <div className={`flex items-center gap-5 ${dark ? 'text-slate-400' : 'text-gray-500'}`}>
          <button type="button" className={actionClassName}>
            <Bell size={20} />
          </button>
          <button type="button" className={actionClassName}>
            <HelpCircle size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className={nameClassName}>{user?.fullName || 'AINotes User'}</p>
            <p className={emailClassName}>{user?.email}</p>
          </div>
          <button type="button" onClick={onLogout} className={logoutClassName}>
            <LogOut size={16} />
            Logout
          </button>
          <div className={avatarClassName}>{initials}</div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
