import React from "react";
import { Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import blur from "./img/blur.png";
import camera from "./img/camera.png";
import clean from "./img/clean.png";
import drop from "./img/drop.png";
import Navbar from "../admin/Navbar";

export default function MainView() {
  return (
    <div className="w-full font-sans">
      <Navbar></Navbar>
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Imagen de fondo */}
        <img
          src="https://containerliving.mx/wp-content/uploads/bb-plugin/cache/Minibodega-amarilla-scaled-landscape.jpg"
          alt="Bodega"
          className="w-full h-full object-cover"
        />

        {/* Contenido */}
        <div className="absolute text-center text-white px-6 ">
          <h1 className="text-5xl md:text-6xl font-bold">RENTA DE BODEGAS</h1>
          <p className="text-lg md:text-1xl mt-6">
            Renta de Bodegas en Cuernavaca, ven y conoce nuestras instalaciones
          </p>
          <p className="text-lg md:text-1xl mt-1">
            las mejores bodegas de todo el estado.
          </p>
        </div>

        {/* Efecto de borde picudo */}
        <div
          className="absolute bottom-0 left-0 w-full h-54 bg-white"
          style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
        ></div>
      </section>

      {/* Servicios */}
      <section className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Contenedor de textos */}
        <div className="text-center md:text-left">
          <h2
            className="text-orange-500 font-bold text-3xl relative mx-auto md:ml-60 mt-6 mb-4 
      after:block after:h-[1.5px] after:w-1/5 after:absolute after:left-0 md:after:mt-1"
          >
            Servicios
          </h2>
          <p className="text-gray-700 max-w-full sm:max-w-[300px] md:max-w-[500px] lg:max-w-[600px] my-2 text-justify">
            Almacena tus bienes temporalmente, en un lugar seguro y accesible
            con las mejores tarifas del mercado. accesible con las mejores
            tarifas del mercado. accesible con las mejores tarifas del mercado.
            accesible con las mejores tarifas del mercado. accesible con las
            mejores tarifas del mercado. accesible con las mejores tarifas del
            mercado. accesible con las mejores tarifas del mercado. accesible
            con las mejores tarifas del mercado. accesible con las mejores
            tarifas del mercado. accesible con las mejores tarifas del mercado.
          </p>
          <p className="text-gray-700 my-2 text-justify mb-15"></p>
        </div>

        {/* Contenedor de imágenes con efecto zoom-in */}
        <div className="grid gap-6">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://www.craneww.com/site/assets/files/2720/warehouse_racks.1200x800.jpg"
              alt="Servicios"
              className="w-full h-auto object-cover transform transition duration-500 hover:scale-110"
            />
          </div>
        </div>
      </section>

      <img src={blur} alt="Bodega" className="w-full h-auto object-cover  " />
      {/* Características */}
      <section className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="text-center">
          <img
            src={camera}
            alt="Feature 1"
            className="w-40 h-35 mx-auto mb-2"
          />
          <p>
            La seguridad en una bodega es un aspecto clave para garantizar la
            integridad de los bienes almacenados.
          </p>
          <p>
            Una bodega en venta debe contar con sistemas modernos de vigilancia,
            tales como cámaras de circuito cerrado, sensores de movimiento y
            control de acceso restringido. Estos elementos no solo disuaden a
            posibles intrusos, sino que también permiten un monitoreo en tiempo
            real de las instalaciones.
          </p>
        </div>

        <div className="text-center">
          <img src={drop} alt="Feature 2" className="w-40 h-35 mx-auto mb-2" />
          <p>
            Para garantizar condiciones óptimas, es recomendable que la bodega
            cuente con sistemas de ventilación adecuados.
          </p>
          <p>
            La circulación de aire evita la acumulación de humedad y ayuda a
            mantener un ambiente estable dentro del almacén. Además, la
            instalación de deshumidificadores puede ser una excelente solución
            en zonas donde la humedad relativa es alta.
          </p>
        </div>

        <div className="text-center">
          <img src={clean} alt="Feature 3" className="w-40 h-35 mx-auto mb-2" />
          <p>
            Nuestro plan de limpieza estructurado incluye la eliminación regular
            de desechos y la desinfección de áreas de almacenamiento y tránsito.
            Barrer, aspirar y trapear los pisos evita la acumulación de polvo y
            partículas que puedan afectar la calidad de los productos.
          </p>
        </div>
      </section>

      {/* Testimonios */}
      <section className="p-13 text-center bg-gray-100">
        <div className="text-center">
          <p className="text-3xl font-bold mb-6">
            ¡Conoce las opiniones de nuestros clientes!
          </p>

          <div className="w-90 mx-auto">
            <p>
              Las bodegas están en muy buenas condiciones, toda el área es
              bastante amplia y lo más importante, son seguras. La atención y
              organización de primera.
            </p>
            <strong>Eduardo</strong>
          </div>
        </div>
      </section>
      {/* Galería */}
      <section className="p-8">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          modules={[Autoplay, Navigation, Pagination]}
          className="w-full"
        ></Swiper>
      </section>

      {/* Ubicación */}
      <section className="text-center p-8">
        <h2 className="text-orange-500 font-bold text-4xl mb-15">
          ¡Ven a conocernos!
        </h2>

        <div className="w-full max-w-4xl mx-auto mt-4 mb-20"></div>
      </section>

      <footer className="bg-gray-500   text-center py-6">
        {/* Imagen de redes sociales */}
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/free-instagram-216-721958.png?f=webp"
            alt="Redes Sociales"
            className="w-12 h-auto rounded-lg  "
          />
          <img
            src="https://static.vecteezy.com/system/resources/previews/018/930/698/non_2x/facebook-logo-facebook-icon-transparent-free-png.png"
            alt="Redes Sociales"
            className="w-12 h-auto rounded-lg  "
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/174/174883.png"
            alt="Redes Sociales"
            className="w-12 h-auto rounded-lg"
          />
        </div>

        <section id="contact-link">
          <p className="text-lg font-semibold">
            © 2025 Bodegas SIGEBO - Todos los derechos reservados.
          </p>
        </section>
        <div className="flex justify-center space-x-4 mt-4"></div>
      </footer>
    </div>
  );
}
