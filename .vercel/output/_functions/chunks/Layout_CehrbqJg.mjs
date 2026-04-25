import { c as createComponent, $ as $$Image } from './_astro_assets_LkAj6goC.mjs';
import { d as createRenderInstruction, b as renderTemplate, e as defineScriptVars, r as renderComponent, c as addAttribute, m as maybeRenderHead, f as renderSlot, g as renderHead } from './entrypoint_Ch4Zg9sJ.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useRef, useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { b as cartItems, t as toggleCart, i as isCartOpen, r as removeItem, u as updateQuantity } from './cartStore_qkDqCX4c.mjs';
import { ShoppingBag, X, Trash2, Minus, Plus } from 'lucide-react';
import { gsap } from 'gsap';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const Logo = new Proxy({"src":"/_astro/logo-1.DmFNgm2D.png","width":310,"height":479,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/aimal-shah/code/floravelle/src/assets/logo-1.png";
							}
							
							return target[name];
						}
					});

const CartButton = ({ dark = false, className = "" }) => {
  const $cartItems = useStore(cartItems);
  const count = $cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: toggleCart,
      className: `relative p-2 transition-all hover:scale-110 active:scale-95 ${dark ? "text-[#3B2D20]" : "text-white"} ${className}`,
      "aria-label": "View Cart",
      children: [
        /* @__PURE__ */ jsx(ShoppingBag, { className: "w-5 h-5 md:w-6 md:h-6" }),
        count > 0 && /* @__PURE__ */ jsx("span", { className: "absolute top-0 right-0 bg-[#7A5633] text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold border-2 border-[#F0EBE5]", children: count })
      ]
    }
  );
};

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Header;
  const { isHome = false } = Astro2.props;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<header id="site-header"', '> <div class="container mx-auto px-6 md:px-12"> <div class="flex items-center justify-between"> <!-- Desktop Left Nav --> <nav class="hidden md:flex items-center gap-12 flex-1"> <a href="/about" class="text-xs uppercase tracking-[0.4em] font-medium text-[#3B2D20] hover:text-[#8A5633] transition-colors">About</a> <a href="/collection" class="text-xs uppercase tracking-[0.4em] font-medium text-[#3B2D20] hover:text-[#8A5633] transition-colors">Collection</a> </nav> <!-- Mobile Left: Menu Trigger --> <div class="md:hidden flex-1 flex items-center"> <button class="mobile-menu-open text-[#3B2D20] opacity-70"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 8h16M4 16h16"></path> </svg> </button> </div> <!-- Center: Logo --> <div class="flex-shrink-0"> <a href="/" class="transition-transform duration-700 hover:scale-105 block"> ', ' </a> </div> <!-- Desktop Right Nav --> <nav class="hidden md:flex items-center justify-end gap-12 flex-1"> <a href="/contact" class="text-xs uppercase tracking-[0.4em] font-medium text-[#3B2D20] hover:text-[#8A5633] transition-colors">Contact</a> <a href="/checkout" class="text-xs uppercase tracking-[0.4em] font-medium text-[#3B2D20] hover:text-[#8A5633] transition-colors">Checkout</a> <div class="flex items-center gap-6"> ', ' <a href="/collection" class="text-[0.6rem] border border-[#8A5633]/30 px-5 py-2 hover:bg-[#8A5633] hover:text-white transition-all uppercase tracking-[0.3em] font-semibold">Shop Now</a> </div> </nav> <!-- Mobile Right: Collection Link --> <div class="md:hidden flex-1 flex justify-end items-center gap-4"> <a href="/collection" class="text-[0.65rem] uppercase tracking-[0.2em] font-bold text-[#8A5633]">Collection</a> </div> </div> </div> </header> <script>(function(){', '\nimport {gsap} from "gsap";\nimport {ScrollTrigger} from "gsap/ScrollTrigger"\n\ngsap.registerPlugin(ScrollTrigger);\n\n\nconst headerScroll = () => {\n  if (!isHome) return;\n\nconst header = document.getElementById("site-header");\nconst hero = document.getElementById("hero");\n\nif(!header || !hero) return;\n\n  gsap.set(header, {y: -100,opacity : 0});\n  \n  ScrollTrigger.create({\n    trigger: hero,\n    start : "top+=30% top",\n    onEnter : () => {\n      console.log("Enter");\n      gsap.to(header, {\n        y:0,\n        opacity :1,\n        duration : 0.5,\n        ease : "none"\n      })\n    },\n    onLeaveBack : () => {\n      console.log("leave");\n      gsap.to(header,{\n        y: -100,\n        opacity : 0,\n        duration : 0.1,\n        ease : "none"\n      })\n    }\n  });\n}\n\n  headerScroll();\n\n  document.addEventListener("astro:page-load", () => {\n    headerScroll()\n  })\n\n})();<\/script>'])), maybeRenderHead(), addAttribute(`md:py-4 py-4 fixed top-0 left-0 w-full z-50 bg-[#F0EBE5] transition-all duration-500 shadow-sm ${isHome ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"}`, "class"), renderComponent($$result, "Image", $$Image, { "src": Logo, "alt": "floravelle", "class": "w-10 md:w-14 h-auto object-contain" }), renderComponent($$result, "CartButton", CartButton, { "client:load": true, "dark": true, "className": "hidden md:flex", "client:component-hydration": "load", "client:component-path": "/home/aimal-shah/code/floravelle/src/components/CartButton", "client:component-export": "default" }), defineScriptVars({ isHome }));
}, "/home/aimal-shah/code/floravelle/src/components/header.astro", void 0);

const $$TransparentHeader = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="t-header | absolute top-[-10%] w-full bg-transparent font-primary flex items-center z-50 py-6 md:py-10 opacity-0"> <div class="container mx-auto px-6 md:px-12"> <div class="flex items-center justify-between"> <!-- Desktop Left Nav --> <nav class="hidden md:flex items-center gap-12 flex-1 text-white"> <a href="/about" class="text-xs uppercase tracking-[0.4em] font-medium hover:opacity-70 transition-opacity">About</a> <a href="/collection" class="text-xs uppercase tracking-[0.4em] font-medium hover:opacity-70 transition-opacity">Collection</a> </nav> <!-- Mobile Left: Menu Trigger --> <!-- <div class="md:hidden flex-1 flex items-center"> --> <!--    <button class="mobile-menu-open text-[#3B2D20] opacity-70"> --> <!--      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> --> <!--        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 8h16M4 16h16" /> --> <!--      </svg> --> <!--    </button> --> <!-- </div> --> <!-- Center Logo --> <div class="flex-shrink-0"> <a href="/" class="text-xl md:text-3xl font-heading tracking-[0.5em] text-white uppercase font-bold block transition-transform duration-700 hover:scale-105">
Floravelle
</a> </div> <!-- Desktop Right Nav --> <nav class="hidden md:flex items-center justify-end gap-12 flex-1 text-white"> <a href="/contact" class="text-xs uppercase tracking-[0.4em] font-medium hover:opacity-70 transition-opacity">Contact</a> <div class="flex items-center gap-6"> ${renderComponent($$result, "CartButton", CartButton, { "client:load": true, "className": "hidden md:flex", "client:component-hydration": "load", "client:component-path": "/home/aimal-shah/code/floravelle/src/components/CartButton", "client:component-export": "default" })} <a href="/collection" class="text-[0.6rem] border border-white/40 px-5 py-2 hover:bg-white hover:text-black transition-all uppercase tracking-[0.3em] font-semibold">Reserve Now</a> </div> </nav> <!-- Mobile Right: Collection Link --> <div class="md:hidden flex-1 flex justify-end items-center gap-4 text-white"> <a href="/collection" class="text-[0.65rem] uppercase tracking-[0.3em] font-bold">Collection</a> </div> </div> </div> </header> ${renderScript($$result, "/home/aimal-shah/code/floravelle/src/components/transparent-header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/aimal-shah/code/floravelle/src/components/transparent-header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="bg-[#E8E4DE] py-12 md:py-20 mt-20 reveal-section"> <div class="container mx-auto font-primary px-4 md:px-0"> <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mb-16 md:mb-32 reveal-element"> <!-- Explore --> <nav> <h3 class="text-lg md:text-2xl font-bold mb-6">Explore</h3> <ul class="flex flex-col text-base md:text-xl font-thin text-black/70 space-y-3"> <li><a class="cursor-pointer hover:text-black hover:translate-x-1 transition-all duration-300 inline-block" href="/collection">Collection</a></li> <li><a class="cursor-pointer hover:text-black hover:translate-x-1 transition-all duration-300 inline-block" href="/#products">Signature Scents</a></li> <li><a class="cursor-pointer hover:text-black hover:translate-x-1 transition-all duration-300 inline-block" href="/collection">Gifts & Sets</a></li> <li><a class="cursor-pointer hover:text-black hover:translate-x-1 transition-all duration-300 inline-block" href="/collection">New Arrivals</a></li> </ul> </nav> <!-- Company --> <nav> <h3 class="text-lg md:text-2xl font-bold mb-6">Company</h3> <ul class="flex flex-col text-base md:text-xl font-thin text-black/70 space-y-3"> <li><a class="cursor-pointer hover:text-black hover:translate-x-1 transition-all duration-300 inline-block" href="/about">About Us</a></li> <li><a class="cursor-pointer hover:text-black hover:translate-x-1 transition-all duration-300 inline-block" href="/#philosophy">Our Philosophy</a></li> </ul> </nav> <!-- Support --> <nav> <h3 class="text-lg md:text-2xl font-bold mb-6">Support</h3> <ul class="flex flex-col text-base md:text-xl font-thin text-black/70 space-y-3"> <li><a class="cursor-pointer hover:text-black hover:translate-x-1 transition-all duration-300 inline-block" href="/contact">Contact Us</a></li> </ul> </nav> </div> <div class="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-black/10 text-black/50 text-sm md:text-base"> <p>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} FLORAVELLE PERFUMES. All rights reserved.</p> <div class="mt-4 md:mt-0 flex gap-6 italic"> <span>Handcrafted in Pakistan</span> <span>Elegance in every drop</span> </div> </div> </div> </footer>`;
}, "/home/aimal-shah/code/floravelle/src/components/footer.astro", void 0);

const $$Preloader = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="preloader" class="fixed inset-0 z-[9999] bg-[#F0EBE5] flex flex-col items-center justify-center overflow-hidden"> <div class="overflow-hidden"> <h1 id="preloader-text" class="text-6xl md:text-8xl font-heading text-[#7A5633] tracking-widest translate-y-[100%]">FLORAVELLE</h1> </div> <div class="mt-8 overflow-hidden"> <p id="preloader-sub" class="text-sm md:text-base font-roboto text-[#7A5633] tracking-widest uppercase opacity-0">Awakening the Senses</p> </div> <div class="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-[#7A5633]/20 overflow-hidden"> <div id="preloader-progress" class="h-full w-0 bg-[#7A5633]"></div> </div> </div> ${renderScript($$result, "/home/aimal-shah/code/floravelle/src/components/Preloader.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/aimal-shah/code/floravelle/src/components/Preloader.astro", void 0);

const $$MobileMenu = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="mobile-menu" class="fixed inset-0 z-[100] bg-[#F0EBE5] translate-x-full transition-transform duration-500 ease-in-out md:hidden flex flex-col"> <!-- Header inside menu --> <div class="px-6 py-4 flex items-center justify-between border-b border-[#3B2D20]/5"> <div class="flex-1"></div> <div class="flex-shrink-0"> ${renderComponent($$result, "Image", $$Image, { "src": Logo, "alt": "Logo", "class": "w-10 h-auto" })} </div> <div class="flex-1 flex justify-end"> <button id="mobile-menu-close" class="text-[#3B2D20] p-2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> </div> <!-- Navigation Links --> <nav class="flex-1 flex flex-col items-center justify-center space-y-12 px-6"> <a href="/" class="mobile-menu-link text-3xl font-heading text-[#3B2D20] tracking-widest uppercase opacity-0 translate-y-4">Home</a> <a href="/about" class="mobile-menu-link text-3xl font-heading text-[#3B2D20] tracking-widest uppercase opacity-0 translate-y-4">About</a> <a href="/collection" class="mobile-menu-link text-3xl font-heading text-[#3B2D20] tracking-widest uppercase opacity-0 translate-y-4">Collection</a> <a href="/contact" class="mobile-menu-link text-3xl font-heading text-[#3B2D20] tracking-widest uppercase opacity-0 translate-y-4">Contact</a> </nav> <!-- Footer inside menu --> <div class="p-12 text-center"> <p class="text-[0.6rem] uppercase tracking-[0.3em] text-[#A39579] font-medium">Elegance in Every Drop</p> </div> </div> ${renderScript($$result, "/home/aimal-shah/code/floravelle/src/components/MobileMenu.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/aimal-shah/code/floravelle/src/components/MobileMenu.astro", void 0);

const CartDrawer = () => {
  const $cartItems = useStore(cartItems);
  const $isCartOpen = useStore(isCartOpen);
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const [isSyncing, setIsSyncing] = useState(false);
  useEffect(() => {
    if ($isCartOpen) {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline();
      tl.to(overlayRef.current, {
        opacity: 1,
        visibility: "visible",
        duration: 0.4,
        ease: "power2.out"
      });
      tl.to(drawerRef.current, {
        x: 0,
        duration: 0.6,
        ease: "expo.out"
      }, "-=0.2");
      tl.fromTo(
        contentRef.current?.children || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: "power2.out" },
        "-=0.3"
      );
    } else {
      document.body.style.overflow = "";
      const tl = gsap.timeline();
      tl.to(drawerRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "expo.in"
      });
      tl.to(overlayRef.current, {
        opacity: 0,
        visibility: "hidden",
        duration: 0.3,
        ease: "power2.in"
      }, "-=0.2");
    }
  }, [$isCartOpen]);
  const subtotal = $cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const handleProceedToCheckout = async () => {
    if ($cartItems.length === 0) return;
    setIsSyncing(true);
    try {
      localStorage.setItem("cart", JSON.stringify($cartItems));
      window.location.href = "/checkout";
    } catch (error) {
      console.error("Checkout error:", error);
      window.location.href = "/checkout";
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: overlayRef,
        className: "fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] opacity-0 invisible",
        onClick: toggleCart
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: drawerRef,
        className: "fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#F0EBE5] z-[101] shadow-2xl translate-x-full flex flex-col",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 flex items-center justify-between border-b border-[#A39579]/20", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(ShoppingBag, { className: "w-5 h-5 text-[#3B2D20]" }),
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-heading text-[#3B2D20] uppercase tracking-wider", children: "Your Cart" }),
              /* @__PURE__ */ jsx("span", { className: "bg-[#7A5633] text-white text-[10px] px-2 py-0.5 rounded-full font-medium", children: $cartItems.reduce((acc, item) => acc + item.quantity, 0) })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: toggleCart,
                className: "p-2 hover:bg-[#A39579]/10 rounded-full transition-colors text-[#3B2D20]",
                children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { ref: contentRef, className: "flex-1 overflow-y-auto p-6 space-y-8", children: $cartItems.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col items-center justify-center text-center space-y-6", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-[#E8E4DE] rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(ShoppingBag, { className: "w-8 h-8 text-[#A39579]" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[#3B2D20] font-heading text-xl uppercase tracking-widest", children: "Cart is empty" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-2", children: "Discover your next signature scent." })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: toggleCart,
                className: "px-8 py-3 border border-[#7A5633] text-[#7A5633] hover:bg-[#7A5633] hover:text-white transition-all duration-500 uppercase tracking-widest text-sm font-medium",
                children: "Browse Collection"
              }
            )
          ] }) : $cartItems.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4 group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-24 h-32 bg-[#E8E4DE] rounded-sm p-2 flex-shrink-0", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: item.image,
                alt: item.name,
                className: "w-full h-full object-contain mix-blend-multiply"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col justify-between py-1", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[#A39579] text-[10px] uppercase tracking-widest mb-1", children: item.subtitle }),
                    /* @__PURE__ */ jsx("h3", { className: "text-[#3B2D20] font-heading text-lg uppercase tracking-wider", children: item.name })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => removeItem(item.id),
                      className: "text-gray-400 hover:text-red-500 transition-colors",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-[#3B2D20] font-medium mt-1", children: [
                  "Rs. ",
                  item.price.toLocaleString()
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4 mt-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center border border-[#A39579]/30 rounded-full px-2 py-1", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => updateQuantity(item.id, item.quantity - 1),
                    className: "p-1 hover:text-[#7A5633] transition-colors",
                    children: /* @__PURE__ */ jsx(Minus, { className: "w-3 h-3" })
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "w-8 text-center text-sm font-medium", children: item.quantity }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => updateQuantity(item.id, item.quantity + 1),
                    className: "p-1 hover:text-[#7A5633] transition-colors",
                    children: /* @__PURE__ */ jsx(Plus, { className: "w-3 h-3" })
                  }
                )
              ] }) })
            ] })
          ] }, item.id)) }),
          $cartItems.length > 0 && /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white border-t border-[#A39579]/20 space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-[#3B2D20]", children: [
              /* @__PURE__ */ jsx("span", { className: "uppercase tracking-[0.2em] text-sm font-medium", children: "Subtotal" }),
              /* @__PURE__ */ jsxs("span", { className: "text-xl font-heading", children: [
                "Rs. ",
                subtotal.toLocaleString()
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-500 italic text-center", children: "Shipping and taxes calculated at checkout." }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleProceedToCheckout,
                disabled: isSyncing,
                className: "w-full bg-[#3B2D20] text-white py-4 uppercase tracking-[0.3em] text-sm font-medium hover:bg-[#7A5633] transition-all duration-500 shadow-lg disabled:opacity-50",
                children: isSyncing ? "Syncing..." : "Proceed to Checkout"
              }
            )
          ] })
        ]
      }
    )
  ] });
};

const FloatingCart = () => {
  const $cartItems = useStore(cartItems);
  const count = $cartItems.reduce((acc, item) => acc + item.quantity, 0);
  if (count === 0) return null;
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: toggleCart,
      className: "md:hidden fixed bottom-8 right-6 z-[90] bg-[#3B2D20] text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-90 animate-fade-in",
      "aria-label": "View Cart",
      children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(ShoppingBag, { className: "w-6 h-6" }),
        /* @__PURE__ */ jsx("span", { className: "absolute -top-2 -right-2 bg-[#7A5633] text-white text-[10px] min-w-[20px] h-[20px] rounded-full flex items-center justify-center font-bold border-2 border-[#3B2D20]", children: count })
      ] })
    }
  );
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "FloraVelle | Elegance in Every Drop",
    description = "Experience the essence of luxury with FLORAVELLE. Handcrafted perfumes from Pakistan, featuring our signature scents collection.",
    image = "/og-image.jpg",
    canonicalURL = Astro2.url.href
  } = Astro2.props;
  const isHome = Astro2.url.pathname === "/";
  const ogImage = image?.startsWith("http") ? image : new URL(image, Astro2.url).href;
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><meta name="generator"', '><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>', '</title><meta name="title"', '><meta name="description"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><link rel="canonical"', "><script>\n			// Run immediately on page load before render\n			if (history.scrollRestoration) {\n				history.scrollRestoration = 'manual';\n			}\n			window.scrollTo(0, 0);\n			// Force scroll to top right before the page unloads/refreshes\n			window.addEventListener('beforeunload', () => {\n				window.scrollTo(0, 0);\n			});\n		<\/script>", "</head> <body data-astro-cid-sckkx6r4> ", " ", " ", " ", " ", " ", " ", " ", "  ", "</body></html>"])), addAttribute(Astro2.generator, "content"), title, addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(Astro2.url, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), addAttribute(Astro2.url, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), addAttribute(canonicalURL, "href"), renderHead(), renderComponent($$result, "Preloader", $$Preloader, { "data-astro-cid-sckkx6r4": true }), renderComponent($$result, "Header", $$Header, { "isHome": isHome, "data-astro-cid-sckkx6r4": true }), isHome && renderTemplate`${renderComponent($$result, "TransparentHeader", $$TransparentHeader, { "data-astro-cid-sckkx6r4": true })}`, renderComponent($$result, "MobileMenu", $$MobileMenu, { "data-astro-cid-sckkx6r4": true }), renderComponent($$result, "CartDrawer", CartDrawer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/aimal-shah/code/floravelle/src/components/CartDrawer", "client:component-export": "default", "data-astro-cid-sckkx6r4": true }), renderComponent($$result, "FloatingCart", FloatingCart, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/aimal-shah/code/floravelle/src/components/FloatingCart", "client:component-export": "default", "data-astro-cid-sckkx6r4": true }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-sckkx6r4": true }), renderScript($$result, "/home/aimal-shah/code/floravelle/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts"));
}, "/home/aimal-shah/code/floravelle/src/layouts/Layout.astro", void 0);

export { $$Layout as $, renderScript as r };
