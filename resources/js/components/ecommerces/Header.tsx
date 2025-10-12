import { Link } from "@inertiajs/react";
import { useState } from "react";


export default function Head() {
  const [ open, setOpen ] = useState(false);
  const [ isCardOpen, setIsCardOpen ] = useState(false);
  const [ isCurrencyOpen, setIsCurrencyOpen ] = useState(false);
  const [ isLanguageOpen, setIsLanguageOpen]  = useState(false);

  return (    
    <>
      {/*  Top Header with social links, currently, language */}
      <div className="bg-gray-800 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <Link prefetch href="#" className="hover:text-gray-300"><i className="fab fa-facebook-f"></i></Link>
            <Link prefetch href="#" className="hover:text-gray-300"><i className="fab fa-twitter"></i></Link>
            <Link prefetch href="#" className="hover:text-gray-300"><i className="fab fa-intagram"></i></Link>
            <Link prefetch href="#" className="hover:text-gray-300"><i className="fab fa-pinterest"></i></Link>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative" x-data="{ open: false }">
              <button onClick={()=>setIsCurrencyOpen(!isCurrencyOpen)} className="flex items-center space-x-1 hover:text-gray-300" >
                <span>FCFA</span>
                <i className="fas fa-chevron-down text-xs"></i>
                {/* <ChevronDown size={16} /> */}
              </button>
              {isCurrencyOpen && ( 
                <div x-show="open" className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-md overflow-hidden z-50" >
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">FCFA - FR Dollar</Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">USD -US Dollar</Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">EUR - Euro</Link>
                </div>
              )}
              <div className="relative" x-data="{ open: false }">
                <button onClick={()=>setIsLanguageOpen(!isLanguageOpen)} className="flex items-center space-x-1 hover:text-gray-300" >
                  <span>Francais</span>
                  <i className="fas fa-chevron-down text-xs"></i>
                  {/* <ChevronDown size={16} /> */}
                </button>
                {isCurrencyOpen && ( 
                  <div x-show="open" className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-md overflow-hidden z-50" >
                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Francais</Link>
                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">English</Link>
                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Espanol</Link>
                  </div>
                )}
              </div>
            </div>
            <Link href="#" className="hover:text-gray-300 flex items-center space-x-1">
              <i className="fas fa-user"></i> 
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header with logo, search, and card */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="#" className="text-2xl font-bold text-indigo-600">ShopMart</Link>

          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input type="text" placeholder="Rechercher un Produit..." className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <button className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-indigo-500"><i className="fas fa-search"></i></button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}