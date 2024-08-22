import { Fragment } from 'react'
import styles from '../component/Footer.module.css'
const Footer = () => {
  return (
    <Fragment>
      <div className={styles["footer"]}>
        <div>
          <h2>Ürünlerimiz</h2>
          <p>-Pepsico</p>
          <p>-Stabit</p>
          <p>-Bionbi</p>
          <p>-Frito Lay</p>
        </div>
        <div>
          <h2>Hakkımızda</h2>
          <p>21 yılı aşkın süredir kaliteli ve güvenli hizmet vermekteyiz</p>
        </div>
        <div>
          <h2>İetişim</h2>
          <p>Email: btarge@deneme.com</p>
          <p>Tel: +905555555555</p>
        </div>
      </div>
    </Fragment>
  );
}

export default Footer
