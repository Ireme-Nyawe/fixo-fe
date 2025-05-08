import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardProducts from './pages/dashboard/Products';
import Categories from './pages/dashboard/ProductsCategories';
import NewProductCategory from './pages/dashboard/NewProductCategory';
import ProtectedRoute from './components/dashboard/ProtectedRoute';
import AdminRoute from './components/dashboard/AdminRoute';
import TechnicianRoute from './components/dashboard/TechnicianRoute';
import NewProduct from './pages/dashboard/NewProduct';
import EditProductCategory from './pages/dashboard/EditProductCategory';
import EditProduct from './pages/dashboard/EditProduct';
import Profile from './pages/dashboard/Profile';
import AdminViewUsers from './pages/dashboard/AdminViewUsers';
import NewUser from './pages/dashboard/NewUser';
import Services from './pages/Services';
import Chats from './pages/dashboard/Chats';
import Logout from './components/dashboard/Logout';
import SupportPage from './pages/SupportPage';
import TechnicianDashboard from './components/dashboard/TechnicianDashboard';
import Payments from './pages/dashboard/admin/Transactions';
import TechnicianOwnPayments from './pages/dashboard/technician/TechnicianOwnPayments';
import TechnicianBalance from './pages/dashboard/technician/TechnicianBalance';
import TechniciansWithdrawals from './pages/dashboard/admin/TechniciansWithdrawals';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/services" element={<Services />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<SingleProduct />} />
      <Route path="/direct-support" element={<SupportPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route element={<AdminRoute />}>
            <Route index={true} element={<Dashboard />} />
            <Route path="products" element={<DashboardProducts />} />
            <Route path="products/new" element={<NewProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/new" element={<NewProductCategory />} />
            <Route
              path="categories/edit/:id"
              element={<EditProductCategory />}
            />
            <Route path="manage-users" element={<AdminViewUsers />} />
            <Route path="manage-users/new" element={<NewUser />} />
            <Route path="payments" element={<Payments />} />
            <Route path="withdrawals" element={<TechniciansWithdrawals />} />
          </Route>

          <Route element={<TechnicianRoute />}>
            <Route
              path="technician-tools"
              element={<h1>Technician Tools Page</h1>}
            />
          </Route>
          <Route path="support" element={<TechnicianDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="chat" element={<Chats />} />
          <Route path="my-payments" element={<TechnicianOwnPayments />} />
          <Route path="balance" element={<TechnicianBalance />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
