import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { app } from "../../services/firebase.service";
import { Container } from "../../components/layouts";
import { DataContext } from "../../context/Provider";
import useField from "../../hooks/useField";
import { Button, Card, Description, Input, Title,Subtitle } from "../../styled-components";
import { ContainerButtons, ContainerFile, ContainerInputs, File, Image, Select } from "./Styled";
import { postProfesional } from "../../services/profesional.service";
import { getPaisesServices } from "../../services/pais.service";

const RegisterProfesional = () => {
  const dni = useField("number", 8);
  const nombre = useField("text");
  const apellido = useField("text");
  const correo = useField("email");
  const password = useField("password");
  const celular = useField("text", 9);
  const domicilio = useField("text");
  const [pais, setPais] = useState("");
  const [archivo, setArchivo] = useState({});
  const [paises, setPaises] = useState([]);
  const { store } = useContext(DataContext);
  const router = useRouter();
  const clearInputs = () => {
    dni.setValue("");
    nombre.setValue("");
    apellido.setValue("");
    dni.setValue("");
    celular.setValue("");
    correo.setValue("");
    password.setValue("");
    domicilio.setValue("");
  };
  const handleGuardarCliente = async () => {
    const path = app.storage().ref().child(archivo.name);
    await path.put(archivo);
    postProfesional(
      dni.value,
      nombre.value,
      apellido.value,
      correo.value,
      password.value,
      celular.value,
      archivo.name,
      pais,
      domicilio.value,
      router
    );
    clearInputs();
  };
  const handleClickRedirectLogin = () => {
    router.push("/profesional");
  };
  useEffect(() => {
    getPaisesServices(setPaises);
  }, []);

  return (
    <Container dark={store.onDark}>
      <Card center dark={store.onDark}>
        <Title center dark={store.onDark}>MONTALVO</Title>
        <Description>plataforma de multiservicios</Description>
        <Image src="./login.png" alt="login" />
        <ContainerButtons>
          <Button onClick={handleClickRedirectLogin}>Ir a Login</Button>
        </ContainerButtons>
      </Card>
      <Card center dark={store.onDark}>
        <Subtitle dark={store.onDark}>Registro</Subtitle>
        <ContainerInputs>
          <Input dark={store.onDark} {...dni} placeholder="DNI" />
          <Input dark={store.onDark} {...nombre} placeholder="Nombre" />
          <Input dark={store.onDark} {...apellido} placeholder="Apellido" />
          <Input dark={store.onDark} {...celular} placeholder="Celular" />
          <Input dark={store.onDark} {...correo} placeholder="Correo Electronico" />
          <Input dark={store.onDark} {...password} placeholder="Contraseña" />
          <Select onChange={(e) => setPais(e.target.value)} defaultValue={null}>
            <option selected disabled>
              selecionar pais
            </option>
            {paises.map((pais, index) => {
              return (
                <option key={index} value={pais.idPais}>
                  {pais.nombrePais}
                </option>
              );
            })}
          </Select>
          <Input {...domicilio} placeholder="Domicilio" />
          <ContainerFile>
            <Subtitle dark={store.onDark}>Agregar foto</Subtitle>
            <File
              type="file"
              onChange={(e) => {
                setArchivo(e.target.files[0]);
              }}
            />
          </ContainerFile>
        </ContainerInputs>
        <ContainerButtons>
          <Button onClick={handleGuardarCliente}>Crear</Button>
        </ContainerButtons>
      </Card>
    </Container>
  );
};

export default RegisterProfesional;
