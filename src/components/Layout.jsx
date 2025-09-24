import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <div>
      <header>
        <NavBar />
      </header>

      <main className='mt-4 mb-10 container mx-auto'>
        <Outlet />
      </main>

      <footer className='border-t border-amber-100 py-3 text-center'>
  <p>© 2025 My Website</p>
</footer>

    </div>
  );
};

export default Layout;
