import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";
import Auth from "./components/Auth/Auth";
import OrdersPage from "./components/Pages/OrdersPage";
import AboutPage from "./components/Pages/AboutPage";
import Home from "./components/Home/Home";
import ProductPage from "./components/Product/ProductPage";
import ProductDetailPage from "./components/Product/ProductDetailPage";
import CategoryPage from "./components/Category/CategoryPage";
import SearchResults from "./components/Pages/SearchResult";
import CartPersistence from "./components/Cart/CartPersistence";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/auth", element: <Auth /> },
        { path: "/about", element: <AboutPage /> },
        { path: "/orders", element: <OrdersPage /> },
        { path: "/product", element: <ProductPage /> },
        { path: "/product/:id", element: <ProductDetailPage /> },
        { path: "category/:categoryName", element: <CategoryPage /> },
        { path: "/search", element: <SearchResults /> },
      ],
    },
  ]);

  return (
    <>
      <CartPersistence />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
