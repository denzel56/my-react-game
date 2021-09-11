import s from './style.module.css';

const Layout = ({ title, urlBg, colorBg, children }) => {
  const styleBg = urlBg ? { background: `url('${urlBg}') center center/cover no-repeat` } : {backgroundColor: colorBg};
  return (
    <section className={s.root} style={styleBg}>
      <div className={s.wrapper}>
        <article>
          <div className={s.title}>
            <h3>{ title }</h3>
              <span className={s.separator}></span>
          </div>
          <div className={`${s.desc} ${s.full}`}>
            { children }
          </div>
        </article>
      </div>
    </section>
    )
}

export default Layout;
