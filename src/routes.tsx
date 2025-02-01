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
import NewProduct from './pages/dashboard/NewProduct';
import EditProductCategory from './pages/dashboard/EditProductCategory';
import EditProduct from './pages/dashboard/EditProduct';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<SingleProduct />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index={true} element={<Dashboard />} />
          <Route path="products" element={<DashboardProducts />} />
          <Route path="products/new" element={<NewProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/new" element={<NewProductCategory />} />
          <Route path="categories/edit/:id" element={<EditProductCategory />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
