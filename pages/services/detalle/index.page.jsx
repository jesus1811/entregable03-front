import { useEffect, useState, useContext } from "react";
import { Card, Container, Header } from "../../../components/layouts";
import { DataContext } from "../../../context/Provider";
import useField from "../../../hooks/useField";
import { getProfesionalServices } from "../../../services/profesional.service";
import { getServicioIdServices } from "../../../services/servicio.service";
import { getValoraciones, postValoracion } from "../../../services/valoracion.service";
import { Button, Input, Loading, Subtitle, Title } from "../../../styled-components";
import { Comentarios, Profesional, ServicioDetalle } from "../components";

const Detalle = () => {
  const [servicio, setServicio] = useState([]);
  const [profesional, setProfesional] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loaderProfesional, setLoaderProfesional] = useState(true);
  const [loaderValoraciones, setLoaderValoraciones] = useState(true);
  const [valoraciones, setValoraciones] = useState([]);
  const comentario = useField("text");
  const { store } = useContext(DataContext);
  useEffect(() => {
    const { idServicio, idProfesional } = JSON.parse(localStorage.getItem("servicio"));
    getServicioIdServices(idServicio, setServicio, setLoader);
    getProfesionalServices(idProfesional, setProfesional, setLoaderProfesional);
    getValoraciones(idServicio, setValoraciones, setLoaderValoraciones);
  }, []);
  useEffect(() => {
    const { idServicio } = JSON.parse(localStorage.getItem("servicio"));
    getValoraciones(idServicio, setValoraciones, setLoaderValoraciones);
  }, [loaderValoraciones]);
  const fecha = new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear();
  const handleClickAddValoracion = () => {
    const { idServicio } = JSON.parse(localStorage.getItem("servicio"));
    postValoracion(comentario.value, idServicio, store?.user[0]?.idCliente, setLoaderValoraciones);
    comentario.setValue("");
  };

  return (
    <Container>
      <Header />
      <Title center>Detalle del Servicio</Title>
      {loader ? <Loading /> : <ServicioDetalle servicio={servicio} fecha={fecha} store={store} />}
      <Subtitle center>Comentarios</Subtitle>
      {loaderValoraciones ? (
        <Loading />
      ) : (
        <>
          {valoraciones.map((valoracion, index) => {
            return <Comentarios valoracion={valoracion} key={index} />;
          })}
          <Card>
            <Input {...comentario} />
            <Button onClick={handleClickAddValoracion}>Agregar Comentario</Button>
          </Card>
        </>
      )}
      <Subtitle center>Informacion Personal del Provedor</Subtitle>
      {loaderProfesional ? <Loading /> : <Profesional profesional={profesional} />}
    </Container>
  );
};

export default Detalle;
