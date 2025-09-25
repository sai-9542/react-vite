import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import { Contact } from './pages/Contact';
import Create from './pages/students/create';
import StudentsList from './pages/students/StudentsList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="students" element={<StudentsList />} />
          <Route path="students/create" element={<Create />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
