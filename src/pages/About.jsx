import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, FlaskConical, HeartHandshake, Leaf, Rabbit } from 'lucide-react'
import { imageUrl } from '../data/products.js'

export default function About() {
  return (
    <main id="top">
      <section className="page-hero">
        <p className="eyebrow">NUESTRA FILOSOFÍA</p>
        <h1>Cuidado que respeta tu día <em>y tu piel.</em></h1>
        <p>Morrow Skin nace en Chile con una idea simple: menos pasos, mejores ingredientes, más calma.</p>
      </section>

      <section className="about-body">
        <div className="about-story">
          <div className="about-image"><img src={imageUrl('photo-1616394584738-fc6e612e71b9', 900)} alt="" /></div>
          <div className="about-copy">
            <h2>Una rutina sencilla,<br /><em>una piel tranquila.</em></h2>
            <p>No creemos en rutinas infinitas ni en promesas imposibles. Creemos en pocos productos bien hechos, con ingredientes que tu piel reconoce y que funcionan bajo el sol chileno, la humedad de la costa y el frío de la cordillera.</p>
            <p>Cada fórmula se piensa para ser parte de tu día real — del apuro de la mañana a la calma de la noche.</p>
          </div>
        </div>

        <div className="about-values">
          <div className="about-value"><FlaskConical size={22} /><h3>Ingredientes que cuidan</h3><p>Formulaciones equilibradas, sin rellenos innecesarios y pensadas para todo tipo de piel.</p></div>
          <div className="about-value"><Leaf size={22} /><h3>Lo esencial</h3><p>Menos productos, mejor selección. Nada de pasos que no aportan.</p></div>
          <div className="about-value"><Rabbit size={22} /><h3>Nunca testeados en animales</h3><p>Elaboramos con estándares éticos y veganos cuando es posible.</p></div>
          <div className="about-value"><HeartHandshake size={22} /><h3>Hecho para todo el país</h3><p>Enviamos a todo Chile con empaques pensados en reducir residuos.</p></div>
        </div>
      </section>

      <section className="about-cta">
        <h2>Descubre los esenciales.</h2>
        <Link to="/tienda" className="button button-dark">Ir a la tienda <ArrowRight size={16} /></Link>
      </section>
    </main>
  )
}