"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, Plus, X, Search, CheckCircle2, User, CreditCard, 
  Loader2, Eye, Trash2, Filter, ChevronDown, LogIn, LogOut, 
  ArrowRight, Settings, PlusCircle, Package, Info, Bell
} from "lucide-react";

interface Product {
  id: string; name: string; description: string; price: number; category: string; images: string[]; stock: number;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{product: Product, quantity: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [priceRange, setPriceRange] = useState(25000);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'payment' | 'success'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const loadData = async () => {
      try {
        const res = await fetch("http://localhost:3001/products");
        const data = await res.json();
        setProducts(data.map((p: any) => ({ ...p, stock: p.stock ?? 10 })));
      } catch (err) { console.error("Sync Error"); }
    };
    loadData();
    const saved = localStorage.getItem("ind_store_pro");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => { if (mounted) localStorage.setItem("ind_store_pro", JSON.stringify(cart)); }, [cart, mounted]);

  const categories = useMemo(() => ["All", ...new Set(products.map(p => p.category))], [products]);
  const filteredProducts = useMemo(() => products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
    (activeCategory === "All" || p.category === activeCategory) && 
    p.price <= priceRange
  ), [products, searchQuery, activeCategory, priceRange]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product: Product) => {
    if (product.stock <= 0) return showToast("Out of Stock");
    setCart(prev => {
      const exist = prev.find(i => i.product.id === product.id);
      if (exist) return prev.map(i => i.product.id === product.id ? {...i, quantity: i.quantity + 1} : i);
      return [...prev, { product, quantity: 1 }];
    });
    showToast("Asset Secured in Cart");
  };

  const total = cart.reduce((acc, i) => acc + (i.product.price * i.quantity), 0);

  if (!mounted) return null;

  return (
    <div className="min-h-screen p-6 md:p-10">
      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -100, opacity: 0 }} className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] bg-cyan-400 text-black px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-3 shadow-2xl">
            <Bell size={14}/> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <header className="flex justify-between items-center mb-10 px-4">
        <div className="text-4xl font-black tracking-tighter italic uppercase">IND.STORE</div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"/> Encryption: AES-256</span>
          </div>
          <div className="flex gap-2">
            {isLoggedIn && (
              <button onClick={() => setIsAdminPanelOpen(true)} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-zinc-400">
                <Settings size={20}/>
              </button>
            )}
            <button onClick={() => isLoggedIn ? setIsLoggedIn(false) : setIsLoginOpen(true)} className="bg-cyan-400 text-black px-8 py-2.5 rounded-full font-black uppercase text-xs shadow-lg active:scale-95 transition-all flex items-center gap-2">
              {isLoggedIn ? <LogOut size={16}/> : <LogIn size={16}/>} {isLoggedIn ? "ADMIN" : "LOGIN"}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* FILTERS PANEL */}
        <aside className="lg:w-80 space-y-6">
          <div className="bg-[#1a1a1a] rounded-[40px] p-8 border border-white/5 shadow-2xl">
            <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-8">Asset Control</h3>
            <div className="space-y-10">
              <div>
                <label className="block text-xs font-bold uppercase mb-4 text-zinc-400">Price Ceiling</label>
                <div className="text-[56px] font-black leading-none mb-2 tracking-tighter text-cyan-400 italic">${priceRange.toLocaleString()}</div>
                <input type="range" min="500" max="25000" step="500" value={priceRange} onChange={(e) => setPriceRange(parseInt(e.target.value))} className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none accent-cyan-400 mt-6" />
              </div>
              <div className="pt-8 border-t border-white/5">
                <div className="text-zinc-500 text-[10px] font-bold uppercase mb-4">Node Categories</div>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all border ${activeCategory === cat ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-zinc-500 hover:border-white/30'}`}>{cat}</button>
                  ))}
                </div>
              </div>
              <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                <div className="text-zinc-500 text-[10px] font-bold uppercase">Active Assets</div>
                <div className="text-2xl font-black italic">{cart.length}</div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 space-y-8">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#e8e8e8] text-black rounded-[40px] p-10 shadow-xl flex flex-col justify-center">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={18}/>
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search encrypted database..." className="w-full bg-white rounded-2xl py-5 px-14 text-sm font-bold outline-none focus:ring-2 ring-cyan-500/20" />
              </div>
            </div>
            <div className="bg-[#f0f4f8] text-black rounded-[40px] p-10 flex flex-col justify-between border border-white/10 shadow-2xl relative">
              <div className="flex justify-between items-start">
                <div className="text-2xl font-black uppercase italic tracking-tighter leading-none">Checkout<br/>Terminal</div>
                <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" className="h-7" />
              </div>
              <div className="flex gap-4 mt-6">
                <button onClick={() => setIsCartOpen(true)} className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg active:scale-95">Open Order</button>
                <button className="flex-1 bg-black text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg active:scale-95">Fast Pay</button>
              </div>
            </div>
          </section>

          {/* GRID */}
          <section className="bg-[#1a1a1a] rounded-[50px] p-10 border border-white/5 shadow-2xl">
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map(p => (
                  <motion.div layout key={p.id} className="bg-[#222222] rounded-[40px] overflow-hidden border border-white/5 group transition-all duration-500">
                    <div className="relative aspect-square bg-black overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(p)}>
                      <img src={p.images[0]} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                      <div className="absolute top-6 left-6 bg-indigo-600 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">{p.category}</div>
                      <div className="absolute top-6 right-6 bg-black/80 px-4 py-2 rounded-2xl text-xs font-black text-cyan-400 border border-white/10">${p.price.toLocaleString()}</div>
                    </div>
                    <div className="p-8">
                       <h4 className="text-xl font-black uppercase italic mb-3 tracking-tighter">{p.name}</h4>
                       <div className="flex items-center gap-2 mb-8 text-[9px] font-bold uppercase tracking-widest text-zinc-500">
                         <Package size={12}/> Stock: {p.stock} units
                       </div>
                       <div className="flex gap-3">
                         <button onClick={() => addToCart(p)} className="flex-1 bg-white text-black hover:bg-cyan-400 py-4 rounded-2xl font-black text-[10px] uppercase transition-all shadow-lg active:scale-95">Deploy Asset</button>
                         <button onClick={() => setSelectedProduct(p)} className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl transition-all"><Info size={20}/></button>
                       </div>
                    </div>
                  </motion.div>
                ))}
             </div>
          </section>
        </main>
      </div>

      {/* PRODUCT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/90 backdrop-blur-3xl">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#111111] border border-white/10 rounded-[60px] w-full max-w-5xl overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,1)]">
              <div className="md:w-1/2 h-[400px] md:h-auto bg-black">
                <img src={selectedProduct.images[0]} className="w-full h-full object-cover" />
              </div>
              <div className="p-16 md:w-1/2 flex flex-col justify-center relative">
                <button onClick={() => setSelectedProduct(null)} className="absolute top-10 right-10 text-zinc-500 hover:text-white transition-colors"><X size={40}/></button>
                <div className="text-indigo-400 text-xs font-black uppercase tracking-[0.3em] mb-4">{selectedProduct.category}</div>
                <h2 className="text-6xl font-black uppercase italic mb-8 tracking-tighter leading-none">{selectedProduct.name}</h2>
                <p className="text-zinc-400 text-lg leading-relaxed mb-10">{selectedProduct.description}</p>
                <div className="flex items-center justify-between mb-12">
                  <div className="text-5xl font-black italic text-cyan-400">${selectedProduct.price.toLocaleString()}</div>
                  <div className="text-zinc-500 font-bold uppercase text-xs">Auth Code: 0x{selectedProduct.id.slice(0,6)}</div>
                </div>
                <button onClick={() => {addToCart(selectedProduct); setSelectedProduct(null)}} className="w-full bg-white text-black py-8 rounded-[30px] font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-cyan-400 transition-all active:scale-95">Add to My Archives</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADMIN PANEL */}
      <AnimatePresence>
        {isAdminPanelOpen && (
          <div className="fixed inset-0 z-[160] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6">
            <motion.div initial={{ x: 100 }} animate={{ x: 0 }} className="bg-[#1a1a1a] border border-white/10 p-16 rounded-[60px] w-full max-w-4xl shadow-2xl">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-4xl font-black uppercase italic flex items-center gap-4"><Settings/> System Dashboard</h2>
                <button onClick={() => setIsAdminPanelOpen(false)}><X size={40}/></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-zinc-500 font-black uppercase text-xs tracking-widest">Global Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/40 p-6 rounded-3xl border border-white/5"><div className="text-zinc-500 text-[9px] uppercase font-black mb-2">Revenue</div><div className="text-2xl font-black text-cyan-400">$142,500</div></div>
                    <div className="bg-black/40 p-6 rounded-3xl border border-white/5"><div className="text-zinc-500 text-[9px] uppercase font-black mb-2">Assets</div><div className="text-2xl font-black">{products.length}</div></div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-zinc-500 font-black uppercase text-xs tracking-widest">Inventory Management</h3>
                  <button className="w-full bg-indigo-600 py-6 rounded-3xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3"><PlusCircle/> Upload New Asset</button>
                  <button className="w-full bg-white/5 hover:bg-white/10 py-6 rounded-3xl font-black uppercase tracking-widest text-xs">Download Sales Report</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LOGIN & CART (Mantienen lógica anterior corregida) */}
      <AnimatePresence>
        {isLoginOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-[#1a1a1a] border border-white/10 p-16 rounded-[60px] w-full max-w-md text-center">
              <h2 className="text-4xl font-black uppercase italic mb-8">Auth Gate</h2>
              <input type="password" placeholder="TOKEN" className="w-full bg-black border border-white/10 p-6 rounded-2xl mb-6 outline-none focus:border-cyan-400 text-center font-black uppercase" />
              <button onClick={() => {setIsLoggedIn(true); setIsLoginOpen(false); showToast("Admin Verified")}} className="w-full bg-cyan-400 text-black py-6 rounded-2xl font-black uppercase tracking-widest">Connect</button>
              <button onClick={() => setIsLoginOpen(false)} className="mt-8 text-zinc-600 text-[10px] font-black uppercase">Abort</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CART SIDEBAR (PayPal Integration) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 z-[120] h-full w-full max-w-xl bg-[#0a0a0a] border-l border-white/10 p-12 flex flex-col shadow-2xl">
              <div className="flex justify-between items-center mb-12"><h2 className="text-5xl font-black italic uppercase">Order</h2><button onClick={() => setIsCartOpen(false)}><X size={32}/></button></div>
              {checkoutStep === 'cart' && (
                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="flex-1 overflow-y-auto space-y-6 pr-4">
                    {cart.map(i => (
                      <div key={i.product.id} className="flex gap-6 items-center bg-white/[0.03] p-6 rounded-[35px] border border-white/5">
                        <img src={i.product.images[0]} className="w-24 h-24 rounded-2xl object-cover" />
                        <div className="flex-1"><h4 className="font-black text-lg uppercase">{i.product.name}</h4><p className="text-cyan-400 font-black text-sm">${i.product.price.toLocaleString()} x {i.quantity}</p></div>
                        <button onClick={() => setCart(prev => prev.filter(p => p.product.id !== i.product.id))} className="text-zinc-600 hover:text-red-500"><Trash2/></button>
                      </div>
                    ))}
                  </div>
                  <div className="pt-10 border-t border-white/10 mt-6">
                    <div className="flex justify-between items-end mb-10"><span className="text-zinc-500 font-black uppercase text-xs">Total</span><span className="text-6xl font-black italic">${total.toLocaleString()}</span></div>
                    <button disabled={cart.length === 0} onClick={() => setCheckoutStep('payment')} className="w-full bg-white text-black py-7 rounded-[30px] font-black uppercase text-xs flex items-center justify-center gap-3">Initialize Checkout <ArrowRight size={18}/></button>
                  </div>
                </div>
              )}
              {checkoutStep === 'payment' && (
                <div className="flex-1 flex flex-col justify-center gap-5">
                  <h3 className="text-3xl font-black uppercase italic mb-8">Portal Selection</h3>
                  <button onClick={() => setPaymentMethod('card')} className={`flex items-center justify-between p-10 rounded-[35px] border ${paymentMethod === 'card' ? 'bg-indigo-600 border-indigo-400' : 'bg-white/5 border-white/10'}`}>
                    <div className="flex items-center gap-6"><CreditCard size={32}/><span className="font-black uppercase text-sm">Credit Card</span></div>
                  </button>
                  <button onClick={() => setPaymentMethod('paypal')} className={`flex items-center justify-between p-10 rounded-[35px] border ${paymentMethod === 'paypal' ? 'bg-[#0070ba] border-cyan-400' : 'bg-white/5 border-white/10'}`}>
                    <div className="flex items-center gap-6"><img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" className="h-6"/><span className="font-black uppercase text-sm">PayPal Gateway</span></div>
                  </button>
                  <button disabled={!paymentMethod || isProcessing} onClick={() => {setIsProcessing(true); setTimeout(() => {setIsProcessing(false); setCheckoutStep('success'); setCart([]);}, 2500)}} className="mt-12 w-full bg-white text-black py-8 rounded-[35px] font-black uppercase text-xs flex items-center justify-center gap-4 active:scale-95 disabled:opacity-10">
                    {isProcessing ? <Loader2 className="animate-spin"/> : "Confirm Secure Payment"}
                  </button>
                </div>
              )}
              {checkoutStep === 'success' && (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="w-32 h-32 bg-cyan-500/20 rounded-full flex items-center justify-center mb-10 text-cyan-400 shadow-[0_0_50px_rgba(34,211,238,0.2)]"><CheckCircle2 size={64} /></div>
                  <h2 className="text-7xl font-black italic uppercase mb-4 tracking-tighter">Success</h2>
                  <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.5em] mb-16">Transaction Signed</p>
                  <button onClick={() => {setIsCartOpen(false); setCheckoutStep('cart');}} className="bg-white text-black px-16 py-6 rounded-full font-black text-xs uppercase shadow-xl hover:bg-cyan-400">Done</button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}