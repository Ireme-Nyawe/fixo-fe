import { NavLink } from 'react-router-dom';

const PaymentsManagmentNavbar = () => {
  const navItems = [
    { label: 'Payments', path: '/dashboard/payments' },
    { label: 'Withdrawals', path: '/dashboard/withdrawals' },
    { label: 'Settings', path: '/dashboard/payments-settings' },
  ];

  return (
    <div className="bg-gray-100 border-b border-gray-300 px-4 py-2 flex space-x-6">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `text-sm font-medium pb-1 border-b-2 ${
              isActive
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent hover:text-blue-500 hover:border-blue-500'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
};

export default PaymentsManagmentNavbar;
