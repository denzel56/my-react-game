import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Layout from './components/Layout';
import bg1 from './assets/bg1.jpg';
import bg3 from './assets/bg3.jpg';

function App() {
  const title = 'This is title';
  const descr = 'This is Description!'
  return (
    <>
      <Header
        title = {title}
        descr = {descr}
      />
      <Layout
        title = {title}
        descr={descr}
        urlBg = {bg1}
      />
      <Layout
        title = {title}
        descr={descr}
        colorBg = '#30d5c8'
      />
      <Layout
        title = {title}
        descr={descr}
        urlBg = {bg3}
      />
      <Footer/>
    </>
  );
}

export default App;
