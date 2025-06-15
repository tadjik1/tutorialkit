import { useStore } from '@nanostores/react';
import { useEffect, useRef, useState } from 'react';
import { authStore } from '../stores/auth-store';

export function LoginButton() {
  const authStatus = useStore(authStore);
  console.log(authStatus);
  const user = authStatus.user || {
    name: 'Sergey Zelenov',
    profileName: 'sergey-zelenov',
    avatarUrl: 'https://i.imgur.com/moPlf7bm.jpg',
  };
  const MENU_ITEMS = [
    { label: 'Public profile', value: 'public-profile' },
    { label: 'Account', value: 'account' },
    { label: 'Logout', value: 'logout' },
  ];

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  function onMenuItemClick(item) {
    setOpen(false);
    switch (item.value) {
      case 'public-profile':
        window.location.href = `https://javascript.info/profile/${user.profileName}`;
        break;
      case 'account':
        window.location.href = `https://javascript.info/profile/${user.profileName}/account`;
        break;
      case 'logout':
        // Add your logout logic here
        // logout().then(() => window.location.reload());
        break;
      default:
        break;
    }
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center mr-4 gap-2 px-2 py-1 rounded hover:bg-gray-700 transition"
        onClick={() => setOpen((v) => !v)}
      >
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-8 h-8 rounded-full object-cover border-2 border-gray-700"
        />
        <span className="text-base text-[#696e79] font-medium">{user.name}</span>
        <div className={open ? 'i-ph-caret-up-duotone' : 'i-ph-caret-down-duotone'} />
      </button>
      {open && (
        <div className="absolute left-0 mt-2 min-w-[200px] bg-gray-800 rounded-xl shadow-lg py-2 z-50 border border-gray-700">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.value}
              className="block w-full text-left px-5 py-2 text-gray-200 hover:bg-gray-700 transition"
              onClick={() => onMenuItemClick(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
