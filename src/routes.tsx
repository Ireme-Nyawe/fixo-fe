import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Products from './pages/dashboard/Products';
import Categories from './pages/dashboard/Categories';
import NewProductCategory from './pages/dashboard/NewProductCategory';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<SingleProduct />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index={true} element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/new" element={<NewProductCategory />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
