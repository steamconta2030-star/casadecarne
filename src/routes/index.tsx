import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { demoProducts } from "../data/demo-products";

export const Route = createFileRoute("/")({ component: Catalogo });

type Cart = Record<string, number>;
type CheckoutStep = "catalogo" | "dados" | "confirmacao";
type DeliveryMode = "entrega" | "retirada";

const money = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function Catalogo() {
  const [cart, setCart] = useState<Cart>({});
  const [step, setStep] = useState<CheckoutStep>("catalogo");
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("entrega");
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    street: "",
    number: "",
    neighborhood: "",
    reference: "",
  });

  const setQty = (id: string, value: number) =>
    setCart((current) => ({
      ...current,
      [id]: Math.max(0, Math.round(value * 1000) / 1000),
    }));

  const removeItem = (id: string) =>
    setCart((current) => ({ ...current, [id]: 0 }));

  const cartItems = demoProducts.filter((product) => (cart[product.id] || 0) > 0);
  const total = useMemo(
    () => demoProducts.reduce((sum, p) => sum + (cart[p.id] || 0) * p.price, 0),
    [cart],
  );

  const canFinish =
    customer.name.trim().length >= 2 &&
    customer.phone.trim().length >= 8 &&
    (deliveryMode === "retirada" ||
      (customer.street.trim() && customer.number.trim() && customer.neighborhood.trim()));

  if (step === "dados") {
    return (
      <section className="checkout-page">
        <button className="back-link" onClick={() => setStep("catalogo")}>← Voltar ao catálogo</button>
        <div className="checkout-layout">
          <div className="checkout-card">
            <span className="eyebrow">FINALIZAÇÃO</span>
            <h1>Como você quer receber?</h1>
            <div className="delivery-options">
              <button className={deliveryMode === "entrega" ? "delivery-option selected" : "delivery-option"} onClick={() => setDeliveryMode("entrega")}>
                <strong>🛵 Entrega</strong><small>Receba no seu endereço</small>
              </button>
              <button className={deliveryMode === "retirada" ? "delivery-option selected" : "delivery-option"} onClick={() => setDeliveryMode("retirada")}>
                <strong>🏪 Retirada</strong><small>Retire diretamente na loja</small>
              </button>
            </div>

            <h2>Seus dados</h2>
            <div className="form-grid">
              <label className="full">Nome<input value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} placeholder="Seu nome" /></label>
              <label>Telefone<input value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} placeholder="(31) 99999-9999" /></label>
              {deliveryMode === "entrega" && <>
                <label>Rua<input value={customer.street} onChange={(e) => setCustomer({ ...customer, street: e.target.value })} placeholder="Rua / avenida" /></label>
                <label>Número<input value={customer.number} onChange={(e) => setCustomer({ ...customer, number: e.target.value })} placeholder="123" /></label>
                <label>Bairro<input value={customer.neighborhood} onChange={(e) => setCustomer({ ...customer, neighborhood: e.target.value })} placeholder="Seu bairro" /></label>
                <label className="full">Referência<input value={customer.reference} onChange={(e) => setCustomer({ ...customer, reference: e.target.value })} placeholder="Ex.: próximo à praça" /></label>
              </>}
            </div>
          </div>

          <aside className="cart checkout-summary">
            <h2>Resumo do pedido</h2>
            {cartItems.map((p) => <div className="cart-row" key={p.id}><div><strong>{p.name}</strong><small>{p.unit === "kg" ? `${cart[p.id].toLocaleString("pt-BR")} kg` : `${cart[p.id]} un`}</small></div><b>{money(p.price * cart[p.id])}</b></div>)}
            <div className="estimate"><span>Total estimado</span><strong>{money(total)}</strong></div>
            <p className="notice">⚖️ Itens vendidos por peso serão pesados antes da saída do pedido.</p>
            <button className="checkout" disabled={!canFinish} onClick={() => setStep("confirmacao")}>Confirmar pedido</button>
          </aside>
        </div>
      </section>
    );
  }

  if (step === "confirmacao") {
    return (
      <section className="confirmation-card">
        <div className="confirmation-icon">✅</div>
        <span className="eyebrow">PEDIDO PRONTO PARA ENVIO</span>
        <h1>Pedido conferido</h1>
        <p>Esta é a etapa visual de confirmação. Na próxima onda vamos salvar o pedido no Supabase e gerar o número real do pedido.</p>
        <div className="confirmation-details">
          <span><b>Cliente</b>{customer.name}</span>
          <span><b>Recebimento</b>{deliveryMode === "entrega" ? "Entrega" : "Retirada"}</span>
          <span><b>Total estimado</b>{money(total)}</span>
        </div>
        <button className="primary" onClick={() => { setCart({}); setCustomer({ name:"", phone:"", street:"", number:"", neighborhood:"", reference:"" }); setStep("catalogo"); }}>Novo pedido</button>
      </section>
    );
  }

  return <>
    <section className="hero">
      <div><span className="eyebrow">DELIVERY DO SEU AÇOUGUE</span><h1>Carne boa, sem fila.</h1><p>Escolha seus cortes, informe o peso aproximado e receba em casa.</p></div>
      <div className="hero-badge">🥩<strong>Fresco todo dia</strong><small>Seleção e corte na hora</small></div>
    </section>
    <div className="content-grid">
      <section><div className="section-title"><div><h2>Escolha seus produtos</h2><p>Produtos por peso têm valor estimado até a pesagem final.</p></div></div>
        <div className="product-grid">{demoProducts.map((p) => <article className="product-card" key={p.id}>
          <div className="product-photo">{p.emoji}</div><span className="category">{p.category}</span><h3>{p.name}</h3>
          <div className="price">{money(p.price)} <small>/{p.unit}</small></div>
          {p.unit === "kg" ? <div className="weight-box"><label>Peso aproximado</label><div className="quick-buttons">{[0.5, 1, 1.5, 2].map((q) => <button key={q} onClick={() => setQty(p.id, q)} className={cart[p.id] === q ? "selected" : ""}>{q.toLocaleString("pt-BR")} kg</button>)}</div><input type="number" min="0" step="0.1" value={cart[p.id] || ""} placeholder="Outro peso (kg)" onChange={(e) => setQty(p.id, Number(e.target.value))} /></div>
          : <div className="unit-actions"><button className="primary" onClick={() => setQty(p.id, (cart[p.id] || 0) + 1)}>Adicionar</button>{cart[p.id] > 0 && <span>{cart[p.id]} un no carrinho</span>}</div>}
        </article>)}</div>
      </section>
      <aside className="cart"><h2>Seu pedido</h2>{cartItems.length === 0 ? <div className="empty compact">🛒<p>Seu carrinho está vazio</p></div> : cartItems.map((p) => <div className="cart-item" key={p.id}><div className="cart-row"><div><strong>{p.name}</strong><small>{p.unit === "kg" ? `${cart[p.id].toLocaleString("pt-BR")} kg` : `${cart[p.id]} un`}</small></div><b>{money(p.price * cart[p.id])}</b></div><div className="cart-controls">{p.unit === "kg" ? <><button onClick={() => setQty(p.id, cart[p.id] - 0.1)}>−100g</button><button onClick={() => setQty(p.id, cart[p.id] + 0.1)}>+100g</button></> : <><button onClick={() => setQty(p.id, cart[p.id] - 1)}>−</button><button onClick={() => setQty(p.id, cart[p.id] + 1)}>+</button></>}<button className="remove" onClick={() => removeItem(p.id)}>Remover</button></div></div>)}
        <div className="estimate"><span>Total estimado</span><strong>{money(total)}</strong></div><p className="notice">⚖️ Carnes são pesadas na separação. O valor final pode variar conforme o peso real.</p><button className="checkout" disabled={!total} onClick={() => setStep("dados")}>Continuar pedido</button></aside>
    </div>
  </>;
}
