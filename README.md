# Test BH Luis Martinez

Tienes que clonar el repositorio en tu computadora y tener instalado npm 
First you need to clone the repository and You must have installed npm to run this project


## ES - instrucciones


1.Tenemos que tener una base de datos en mysql con las tablas que se encuentran en nuestra carpeta /server/src/config/scriptSQL.sql

2.Tendremos que pegar las credenciales de nuestra base de datos en nuestro .env

3.Una vez que ingreso las credenciales correctas y que se realizo la integración con la base de datos solo queda el poder tener los puertos 3001, y 5173 disponibles y ejecutar en la raiz del proyecto.

`npm run install-server` así como tambien `npm run install-client`

### NOTA: Esperamos a que no salga ningun tipo de error y si sale algún error debemos de seguir los siguientes pasos:

4. Acceder a el folder de cada proyecto y ejecutar un `npm install` para que se instalen las dependencias necesarias


4. Tendremos que verificar que tanto el puerto 3001 como el 5173 de nuestro equipo estén disponibles para su uso

5. Una vez que estén libres tendremos que colocarnos en la raíz del proyecto, abrir 2 ventanas de terminal y ejecutar los comandos:

`npm run server` y en la otra ventana el comando:  `npm run client`

ambos deben de dar mensaje de que se están ejecutando correctamente.

6. Ingresa a tu http://localhost:5173/ Y si se muestran las peliculas favoritas del momento tu proyecto fullstack se ejecuto correctamente!.



