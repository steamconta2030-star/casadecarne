import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { demoProducts, type DemoProduct } from "../data/demo-products";

export const Route = createFileRoute("/pdv")({ component: Pdv });
const money=(v:number)=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});

function Pdv(){
 const [items,setItems]=useState<Array<{p:DemoProduct;qty:number}>>([]);
 const [weightProduct,setWeightProduct]=useState<DemoProduct|null>(null); const [weight,setWeight]=useState(1);
 const add=(p:DemoProduct,qty=1)=>setItems(old=>{const x=old.find(i=>i.p.id===p.id);return x?old.map(i=>i.p.id===p.id?{...i,qty:i.qty+qty}:i):[...old,{p,qty}]});
 const total=items.reduce((s,i)=>s+i.p.price*i.qty,0);
 return <div><div className="page-heading"><div><span className="eyebrow">FRENTE DE CAIXA</span><h1>PDV</h1><p>Clique no produto. Itens por kg pedem o peso real da balança.</p></div><div className="status-dot">● Caixa aberto</div></div>
 <div className="pdv-grid"><section><div className="search">🔎 Buscar produto ou código de barras...</div><div className="pdv-products">{demoProducts.map(p=><button className="pdv-product" onClick={()=>p.unit==="kg"?(setWeightProduct(p),setWeight(1)):add(p)}><span>{p.emoji}</span><strong>{p.name}</strong><small>{money(p.price)}/{p.unit}</small></button>)}</div></section>
 <aside className="ticket"><h2>Venda atual</h2>{items.length===0?<div className="empty">Nenhum item lançado</div>:items.map(i=><div className="cart-row"><div><strong>{i.p.name}</strong><small>{i.qty.toLocaleString("pt-BR")} {i.p.unit}</small></div><b>{money(i.qty*i.p.price)}</b></div>)}<div className="ticket-total"><span>TOTAL</span><strong>{money(total)}</strong></div><button className="checkout" disabled={!total}>Finalizar venda</button></aside></div>
 {weightProduct&&<div className="modal-backdrop"><div className="weight-modal"><span className="big-emoji">⚖️</span><h2>Informe o peso</h2><p>{weightProduct.name} · {money(weightProduct.price)}/kg</p><label>Peso da balança (kg)</label><input autoFocus type="number" step="0.001" min="0.001" value={weight} onChange={e=>setWeight(Number(e.target.value))}/><div className="weight-total">{weight.toLocaleString("pt-BR")} kg = <strong>{money(weight*weightProduct.price)}</strong></div><div className="modal-actions"><button onClick={()=>setWeightProduct(null)}>Cancelar</button><button className="primary" onClick={()=>{add(weightProduct,weight);setWeightProduct(null)}}>Adicionar à venda</button></div></div></div>}
 </div>
}
