import { createFileRoute } from "@tanstack/react-router";
import { demoProducts } from "../data/demo-products";
export const Route=createFileRoute("/produtos")({component:Produtos});
const money=(v:number)=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
function Produtos(){return <div><div className="page-heading"><div><span className="eyebrow">GESTÃO</span><h1>Produtos</h1><p>Cadastre cortes, preços e defina se a venda é por kg ou unidade.</p></div><button className="primary">+ Novo produto</button></div><div className="table-card"><div className="table-head"><span>Produto</span><span>Categoria</span><span>Venda</span><span>Preço</span><span>Status</span></div>{demoProducts.map(p=><div className="table-row"><span><b>{p.emoji} {p.name}</b></span><span>{p.category}</span><span className="pill">{p.unit==="kg"?"⚖️ Por peso":"▣ Unidade"}</span><span><b>{money(p.price)}</b>/{p.unit}</span><span className="success">● Ativo</span></div>)}</div></div>}
