import { useMemo, useState } from 'react';
import { ArrowRight, Check, Clock3, Heart, Leaf, MapPin, Menu as MenuIcon, Minus, Plus, Search, ShoppingBag, ShoppingCart, Star, Trash2, Utensils, X, Bike, Sparkles } from 'lucide-react';

const foods = [
    { id: 1, name: 'Classic Smash Burger', cat: 'Burgers', price: 249, rating: 4.8, time: '20–25 min', tag: 'Bestseller', desc: 'Double smash patty, cheddar, pickles and house sauce.', img: 'photo-1568901346375-23c9450c58cd' },
    { id: 2, name: 'Margherita Pizza', cat: 'Pizza', price: 329, rating: 4.7, time: '25–30 min', tag: 'Classic', desc: 'Wood-fired crust, mozzarella, basil and tomato.', img: 'photo-1579751626657-72bc17010498' },
    { id: 3, name: 'Green Goddess Bowl', cat: 'Healthy', price: 279, rating: 4.9, time: '15–20 min', tag: 'Fresh pick', desc: 'Avocado, greens, quinoa, cucumber and lemon tahini.', img: 'photo-1512621776951-a57141f2eefd' },
    { id: 4, name: 'Crispy Chicken Burger', cat: 'Burgers', price: 289, rating: 4.6, time: '20–25 min', tag: 'Popular', desc: 'Crunchy chicken, slaw, lettuce and smoky mayo.', img: 'photo-1606755962773-d324e0a13086' },
    { id: 5, name: 'Garden Pesto Pizza', cat: 'Pizza', price: 359, rating: 4.8, time: '25–30 min', tag: 'Veg favourite', desc: 'Basil pesto, roasted vegetables and creamy cheese.', img: 'photo-1571407970349-bc81e7e96d47' },
    { id: 6, name: 'Berry Smoothie', cat: 'Drinks', price: 159, rating: 4.5, time: '5–10 min', tag: 'Cool down', desc: 'Strawberry, blueberry, banana and chilled yoghurt.', img: 'photo-1505252585461-04db1eb84625' },
    { id: 7, name: 'Chocolate Lava Cake', cat: 'Desserts', price: 189, rating: 4.9, time: '15–20 min', tag: 'Sweet treat', desc: 'Warm chocolate cake with a gooey centre.', img: 'photo-1606313564200-e75d5e30476c' },
    { id: 8, name: 'Loaded Masala Fries', cat: 'Snacks', price: 149, rating: 4.6, time: '12–15 min', tag: 'Snack time', desc: 'Golden fries tossed with house masala and herbs.', img: 'photo-1573080496219-bb080dd4f877' },
    { id: 9, name: 'Iced Caramel Latte', cat: 'Drinks', price: 179, rating: 4.7, time: '5–10 min', tag: 'Chilled', desc: 'Espresso, milk, caramel and plenty of ice.', img: 'photo-1461023058943-07fcbe16d735' },
    { id: 10, name: 'Creamy Alfredo Pasta', cat: 'Healthy', price: 299, rating: 4.7, time: '20–25 min', tag: 'Comfort food', desc: 'Silky parmesan sauce, herbs and roasted mushrooms.', img: 'photo-1473093295043-cdd812d0e601' },
    { id: 11, name: 'Pepperoni Pizza', cat: 'Pizza', price: 399, rating: 4.8, time: '25–30 min', tag: 'Crowd pleaser', desc: 'Melty cheese, tomato sauce and spicy pepperoni.', img: 'photo-1628840042765-356cda07504e' },
    { id: 12, name: 'Pancake Stack', cat: 'Desserts', price: 219, rating: 4.6, time: '15–20 min', tag: 'Brunch mood', desc: 'Fluffy pancakes, berries and maple drizzle.', img: 'photo-1528207776546-365bb710ee93' }
];
const cats = ['All', 'Burgers', 'Pizza', 'Healthy', 'Desserts', 'Drinks', 'Snacks'];
const money = n => '₹' + n.toLocaleString('en-IN');
const image = f => `https://images.unsplash.com/${f.img}?auto=format&fit=crop&w=850&q=85`;

function Brand({ go }) { return <button className="brand" onClick={() => go('home')}><span className="brandicon"><Utensils size={19} /></span><span>crave<span className="green">loop</span><small>GOOD FOOD. GOOD MOOD.</small></span></button> }
function Header({ view, go, count, query, setQuery }) { const [open, setOpen] = useState(false); const nav = v => { go(v); setOpen(false) }; return <><div className="announcement"><Sparkles size={13} /> A little joy is on the menu today <span>·</span> Free delivery over ₹499</div><header className="topbar"><Brand go={go} /><nav className={open ? 'nav open' : 'nav'}><button className={view === 'home' ? 'active' : ''} onClick={() => nav('home')}>Home</button><button className={view === 'menu' ? 'active' : ''} onClick={() => nav('menu')}>Explore menu</button><button className={view === 'cart' ? 'active' : ''} onClick={() => nav('cart')}>Your orders</button></nav><div className="headright"><label className="search"><Search size={17} /><input placeholder="Find your cravings" value={query} onChange={e => { setQuery(e.target.value); if (e.target.value) go('menu') }} /></label><button className="cartbtn" onClick={() => nav('cart')}><ShoppingBag size={17} /><span>Cart</span>{count > 0 && <b>{count}</b>}</button><button className="hamb" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <MenuIcon />}</button></div></header></> }
function Card({ f, add, qty }) { const [liked, setLiked] = useState(false); return <article className="foodcard"><div className="foodphoto"><img src={image(f)} alt={f.name} loading="lazy" /><span className="tag">{f.tag}</span><button className={'heart ' + (liked ? 'liked' : '')} onClick={() => setLiked(!liked)} aria-label="Favourite"><Heart size={16} fill={liked ? 'currentColor' : 'none'} /></button></div><div className="foodbody"><div className="meta"><span className="rating"><Star size={13} fill="currentColor" /> {f.rating}</span><span>·</span><span><Clock3 size={13} /> {f.time}</span></div><h3>{f.name}</h3><p>{f.desc}</p><div className="foodbottom"><strong>{money(f.price)}</strong><button className={'add ' + (qty ? 'added' : '')} onClick={() => add(f)}>{qty ? <><Check size={14} /> Added ({qty})</> : <><Plus size={15} /> Add</>}</button></div></div></article> }
function Heading({ eyebrow, title, desc, action, click }) { return <div className="sectionheading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{desc && <p>{desc}</p>}</div>{action && <button className="textlink" onClick={click}>{action} <ArrowRight size={15} /></button>}</div> }
function Home({ go, add, cart, query }) { let popular = foods.filter(f => [1, 2, 3, 7].includes(f.id)); if (query) popular = popular.filter(f => (f.name + f.cat + f.desc).toLowerCase().includes(query.toLowerCase())); return <><main><section className="hero wrap"><div className="herocopy"><span className="pill"><Sparkles size={13} /> YOUR HAPPY PLACE FOR FOOD</span><h1>Good food.<br /><span>Great mood.</span></h1><p>Big cravings deserve big flavour. Discover your next favourite bite, made fresh and delivered with love.</p><div className="heroactions"><button className="primary" onClick={() => go('menu')}>Explore the menu <ArrowRight size={16} /></button><div className="delivery"><span><Bike size={18} /></span><div><b>Fast delivery</b><small>At your doorstep</small></div></div></div><div className="proof"><span>👩🏽 👨🏻 👩🏼 🧑🏿</span><div><b>★★★★★</b><small><strong>4.9/5</strong> from 2,000+ happy bites</small></div></div></div><div className="heroart"><img src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1100&q=90" alt="Juicy burger" /><div className="float topfloat">✦ <span><b>Made fresh</b><small>Every single order</small></span></div><div className="float bottomfloat">🍔 <span><b>Today's craving</b><small>Smash burger · ₹249</small></span><ArrowRight size={15} /></div><span className="sparkle">✳</span></div></section><section className="wrap benefits"><div><span className="benefiticon peach"><Bike /></span><span><b>Quick delivery</b><small>To your door, on time</small></span></div><div><span className="benefiticon mint"><Leaf /></span><span><b>Fresh ingredients</b><small>Quality in every bite</small></span></div><div><span className="benefiticon lilac"><Heart /></span><span><b>Made with love</b><small>Food that feels good</small></span></div><div><span className="benefiticon yellow"><Check /></span><span><b>Easy checkout</b><small>No fuss, just flavour</small></span></div></section><section className="wrap popular"><Heading eyebrow="A LITTLE SOMETHING DELICIOUS" title="Popular right now" desc="The crowd favourites you’ll want to come back for." action="See full menu" click={() => go('menu')} />{popular.length ? <div className="grid">{popular.map(f => <Card key={f.id} f={f} add={add} qty={cart[f.id]?.qty || 0} />)}</div> : <p className="emptysearch">No popular dishes match that search. <button onClick={() => go('menu')}>Search all dishes</button></p>}</section><section className="wrap promo"><span>🥗</span><div><small className="eyebrow">A FRESH START</small><h2>Little choices. Big feel-good energy.</h2><p>Fresh bowls, colourful plates and feel-good favourites for every kind of day.</p></div><button className="darkbutton" onClick={() => go('menu')}>Find your fresh <ArrowRight size={15} /></button></section></main></> }
function Menu({ add, cart, query, setQuery }) { const [cat, setCat] = useState('All'), [sort, setSort] = useState('featured'); let list = useMemo(() => { let a = foods.filter(f => (cat === 'All' || f.cat === cat) && (f.name + ' ' + f.desc + ' ' + f.cat).toLowerCase().includes(query.toLowerCase())); if (sort === 'price') a.sort((x, y) => x.price - y.price); if (sort === 'rating') a.sort((x, y) => y.rating - x.rating); return a }, [cat, sort, query]); return <main className="wrap page"><div className="menuintro"><span className="eyebrow">MADE FOR YOUR MOOD</span><h1>Find your <span>kind of delicious.</span></h1><p>From quick little bites to full-on comfort food. Your next favourite is right here.</p></div><div className="toolbar"><div className="categories">{cats.map(c => <button className={cat === c ? 'selected' : ''} key={c} onClick={() => setCat(c)}>{c}</button>)}</div><label className="sort">Sort by <select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="price">Price: low to high</option><option value="rating">Top rated</option></select></label></div><div className="results"><span>{list.length} delicious options</span><span>Freshly made, just for you ✦</span></div>{list.length ? <div className="grid">{list.map(f => <Card key={f.id} f={f} add={add} qty={cart[f.id]?.qty || 0} />)}</div> : <div className="empty"><span>🥣</span><h2>No dishes found</h2><p>Try another search or category.</p><button className="primary" onClick={() => { setQuery(''); setCat('All') }}>Clear filters</button></div>}</main> }
function Summary({ totals, go, button = 'Continue to checkout' }) { return <aside className="summary"><h3>Order summary <span>✦</span></h3><div><span>Subtotal</span><b>{money(totals.sub)}</b></div><div><span>Delivery fee</span><b>{totals.delivery ? money(totals.delivery) : 'FREE'}</b></div><div><span>Taxes & charges</span><b>{money(totals.tax)}</b></div><hr /><div className="total"><span>Total</span><strong>{money(totals.total)}</strong></div><p className="eta"><Bike size={16} /> Estimated delivery <b>25–35 min</b></p><button className="primary full" onClick={go}>{button}<ArrowRight size={16} /></button><small className="safe"><Check size={12} /> Safe and secure demo checkout</small></aside> }
function Cart({ items, change, remove, totals, go }) { if (!items.length) return <main className="wrap page"><div className="empty"><span className="emptyicon"><ShoppingCart size={32} /></span><h2>Your cart is taking a little break.</h2><p>There’s plenty of deliciousness waiting for you.</p><button className="primary" onClick={() => go('menu')}>Explore the menu <ArrowRight size={16} /></button></div></main>; return <main className="wrap page"><div className="pagetitle"><span className="eyebrow">YOUR GOOD STUFF</span><h1>Your cart <span>({items.reduce((s, i) => s + i.qty, 0)} items)</span></h1><p>One step closer to something delicious.</p></div><div className="layout"><section className="panel"><div className="panelhead"><h2>Your items</h2><button className="textlink" onClick={() => go('menu')}>+ Add more</button></div>{items.map(i => <div className="cartitem" key={i.id}><img src={image(i)} alt={i.name} /><div className="iteminfo"><h3>{i.name}</h3><small>{i.cat}</small><b>{money(i.price)}</b><div className="quantity"><button onClick={() => change(i.id, -1)} aria-label="Decrease quantity"><Minus size={13} /></button><strong>{i.qty}</strong><button onClick={() => change(i.id, 1)} aria-label="Increase quantity"><Plus size={13} /></button></div></div><div className="itemright"><b>{money(i.price * i.qty)}</b><button onClick={() => remove(i.id)} aria-label="Remove item"><Trash2 size={15} /></button></div></div>)}<div className="carttip">✦ <span><b>Good things are worth sharing.</b><small>Bring a friend into the loop and make it a feast.</small></span></div></section><Summary totals={totals} go={() => go('checkout')} /></div></main> }
function Checkout({ items, totals, go, place }) { const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', landmark: '', payment: 'upi', instructions: '' }), [errors, setErrors] = useState({}); const update = (k, v) => { setForm(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: '' })) }; const submit = e => { e.preventDefault(); let er = {}; if (!form.name.trim()) er.name = 'Please enter your name.'; if (!/^[6-9]\\d{9}$/.test(form.phone)) er.phone = 'Enter a valid 10-digit Indian mobile number.'; if (!/^\\S+@\\S+\\.\\S+$/.test(form.email)) er.email = 'Enter a valid email address.'; if (!form.address.trim()) er.address = 'Please enter your delivery address.'; if (!items.length) { go('menu'); return } if (Object.keys(er).length) { setErrors(er); return } place({ ...form, items, total: totals.total, id: 'CL' + Date.now().toString().slice(-7) }) }; if (!items.length) return <main className="wrap page"><div className="empty"><h2>Your cart is empty</h2><button className="primary" onClick={() => go('menu')}>Browse menu</button></div></main>; return <main className="wrap page"><div className="pagetitle"><span className="eyebrow">ALMOST THERE</span><h1>Make it <span>yours.</span></h1><p>A few details and we’ll get the good stuff on its way.</p></div><form className="layout" onSubmit={submit} noValidate><section className="panel checkoutpanel"><section className="formsection"><div className="formtitle"><i>1</i><span><h2>Contact details</h2><small>So we can keep you in the loop.</small></span></div><div className="fields"><label>Full name<input value={form.name} onChange={e => update('name', e.target.value)} placeholder="e.g. Aanya Sharma" />{errors.name && <small className="error">{errors.name}</small>}</label><label>Mobile number<input inputMode="numeric" maxLength="10" value={form.phone} onChange={e => update('phone', e.target.value.replace(/\\D/g, ''))} placeholder="10-digit number" />{errors.phone && <small className="error">{errors.phone}</small>}</label><label>Email address<input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" />{errors.email && <small className="error">{errors.email}</small>}</label></div></section><section className="formsection"><div className="formtitle"><i>2</i><span><h2>Delivery address</h2><small>Where should we bring your order?</small></span></div><div className="fields"><label className="wide">Full address<textarea rows="3" value={form.address} onChange={e => update('address', e.target.value)} placeholder="Flat / house number, street, area, city, PIN code" />{errors.address && <small className="error">{errors.address}</small>}</label><label className="wide">Landmark (optional)<input value={form.landmark} onChange={e => update('landmark', e.target.value)} placeholder="Near a popular place" /></label><label className="wide">Delivery instructions (optional)<input value={form.instructions} onChange={e => update('instructions', e.target.value)} placeholder="Call on arrival, etc." /></label></div></section><section className="formsection"><div className="formtitle"><i>3</i><span><h2>Payment method</h2><small>Demo checkout — no real payment will be taken.</small></span></div><div className="payments">{[['upi', '📱', 'UPI / QR'], ['card', '💳', 'Credit / debit card'], ['cash', '💵', 'Cash on delivery']].map(([v, em, l]) => <button type="button" key={v} className={form.payment === v ? 'payoption chosen' : 'payoption'} onClick={() => update('payment', v)}><span>{em}</span><b>{l}</b>{form.payment === v && <Check size={15} />}</button>)}</div></section><div className="formactions"><button type="button" className="back" onClick={() => go('cart')}>← Back to cart</button><button type="submit" className="primary">Place demo order <ArrowRight size={16} /></button></div></section><Summary totals go={submit} button="Place demo order" /></form></main> }
function Success({ order, go }) { if (!order) return <main className="wrap page"><div className="empty"><h2>No order yet</h2><button className="primary" onClick={() => go('menu')}>Explore menu</button></div></main>; return <main className="wrap page success"><div className="successcheck"><Check size={35} /></div><span className="eyebrow">THAT'S A WRAP (FOR NOW)</span><h1>Order placed.<br /><span>Happiness incoming.</span></h1><p>Thanks, {order.name.split(' ')[0]}! Your order is in our demo kitchen. Get ready for something delicious.</p><div className="reference"><small>ORDER REFERENCE</small><strong>#{order.id}</strong><span>● Confirmed · Demo order</span></div><div className="successdetails"><div><MapPin /><span><small>Delivering to</small><b>{order.address}</b></span></div><div><ShoppingBag /><span><small>Payment method</small><b>{{ upi: 'UPI / QR', card: 'Credit / debit card', cash: 'Cash on delivery' }[order.payment]}</b></span></div><div><Clock3 /><span><small>Estimated delivery</small><b>25–35 minutes</b></span></div></div><div className="successTotal"><span>Order total</span><strong>{money(order.total)}</strong></div><p className="notice">This is a front-end assignment demo. No restaurant received this order and no payment was processed.</p><button className="primary" onClick={() => go('menu')}>Order something else <ArrowRight size={16} /></button></main> }

export default function App() {
    const [view, setView] = useState('home'), [cart, setCart] = useState({}), [query, setQuery] = useState(''), [order, setOrder] = useState(null);

    const go = v => {
        setView(v);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Corrected add-to-cart function
    const add = f => setCart(p => ({
        ...p,
        [f.id]: p[f.id]
            ? { ...p[f.id], qty: p[f.id].qty + 1 }
            : { ...f, qty: 1 }
    }));

    const change = (id, d) => setCart(p => {
        if (!p[id]) return p;
        let q = p[id].qty + d;
        if (q < 1) {
            let n = { ...p };
            delete n[id];
            return n;
        }
        return { ...p, [id]: { ...p[id], qty: q } };
    });

    const remove = id => setCart(p => {
        let n = { ...p };
        delete n[id];
        return n;
    });

    const items = Object.values(cart);
    const count = items.reduce((s, i) => s + i.qty, 0);
    const sub = items.reduce((s, i) => s + i.price * i.qty, 0);
    const delivery = sub === 0 || sub >= 499 ? 0 : 39;
    const tax = Math.round(sub * 0.05);
    const totals = { sub, delivery, tax, total: sub + delivery + tax };

    const place = o => {
        setOrder(o);
        setCart({});
        go('success');
    };

    return (
        <div className="app">
            <Header view={view} go={go} count={count} query={query} setQuery={setQuery} />

            {view === 'home' && <Home go={go} add={add} cart={cart} query={query} />}
            {view === 'menu' && <Menu add={add} cart={cart} query={query} setQuery={setQuery} />}
            {view === 'cart' && <Cart items={items} change={change} remove={remove} totals={totals} go={go} />}
            {view === 'checkout' && <Checkout items={items} totals={totals} go={go} place={place} />}
            {view === 'success' && <Success order={order} go={go} />}

            <footer>
                <div className="wrap foot">
                    <Brand go={go} />
                    <p>Good food brings us together. Keep the good stuff looping.</p>
                    <span>
                        Made with <b>♥</b> for food lovers
                        <br />
                        <small>© 2026 CraveLoop · Student project demo</small>
                    </span>
                </div>
            </footer>
        </div>
    );
}
