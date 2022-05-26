import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "../../../../components/common";
import { DataContext } from "../../../../context/Provider";
import styles from "./servicio.module.scss";

const Comprobante = ({ comprobante }) => {
  const { store } = useContext(DataContext);
  const router = useRouter();
  return (
    <article className={styles.card}>
      <h1 className={store.onDark ? styles.titleDark : styles.title}>{comprobante.fecha}</h1>
      <h1 className={store.onDark ? styles.titleDark : styles.title}>{comprobante.plataformaDePago}</h1>
      <Button>Ver Detalle</Button>
    </article>
  );
};

export default Comprobante;
