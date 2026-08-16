import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { demoProducts } from "../data/demo-products";

export const Route = createFileRoute("/")({ component: Catalogo });

type Cart = Record<string, number>;
const money = (v:number) => v.toLocaleString("pt-BR", { style:"currency", currency:"BRL" });

function Catalogo() {
  const [cart, setCart] = useState<Cart>({});
  const setQty = (id:string, value:number) => setCart(c => ({...c, [id]: Math.max(0, Math.round(value * 1000) / 1000)}));
  const total = useMemo(() => demoProducts.reduce((sum,p) => sum + (cart[p.id] || 0) * p.price, 0), [cart]);

  return <>
    <section className="hero">
      <div><span className="eyebrow">DELIVERY DO SEU AÇOUGUE</span><h1>Carne boa, sem fila.</h1><p>Escolha seus cortes, informe o peso aproximado e receba em casa.</p></div>
      <div className="hero-badge">🥩<strong>Fresco todo dia</strong><small>Seleção e corte na hora</small></div>
    </section>
    <div className="content-grid">
      <section><div className="section-title"><div><h2>Escolha seus produtos</h2><p>Produtos por peso têm valor estimado até a pesagem final.</p></div></div>
        <div className="product-grid">{demoProducts.map(p => <article className="product-card" key={p.id}>
          <div className="product-photo">{p.emoji}</div><span className="category">{p.category}</span><h3>{p.name}</h3>
          <div className="price">{money(p.price)} <small>/{p.unit}</small></div>
          {p.unit === "kg" ? <div className="weight-box"><label>Peso aproximado</label><div className="quick-buttons">{[0.5,1,1.5,2].map(q => <button onClick={()=>setQty(p.id,q)} className={cart[p.id]===q?"selected":""}>{q.toLocaleString("pt-BR")} kg</button>)}</div><input type="number" min="0" step="0.1" value={cart[p.id] || ""} placeholder="Outro peso (kg)" onChange={e=>setQty(p.id, Number(e.target.value))}/></div>
          : <button className="primary" onClick={()=>setQty(p.id,(cart[p.id]||0)+1)}>Adicionar {cart[p.id] ? `(${cart[p.id]})` : ""}</button>}
        </article>)}</div>
      </section>
      <aside className="cart"><h2>Seu pedido</h2>{demoProducts.filter(p=>cart[p.id]>0).length===0 ? <div className="empty">🛒<p>Seu carrinho está vazio</p></div> : demoProducts.filter(p=>cart[p.id]>0).map(p=><div className="cart-row" key={p.id}><div><strong>{p.name}</strong><small>{p.unit==="kg"?`${cart[p.id].toLocaleString("pt-BR")} kg`:`${cart[p.id]} un`}</small></div><b>{money(p.price*cart[p.id])}</b></div>)}
        <div className="estimate"><span>Total estimado</span><strong>{money(total)}</strong></div><p className="notice">⚖️ Carnes são pesadas na separação. O valor final pode variar conforme o peso real.</p><button className="checkout" disabled={!total}>Continuar pedido</button></aside>
    </div>
  </>;
}
