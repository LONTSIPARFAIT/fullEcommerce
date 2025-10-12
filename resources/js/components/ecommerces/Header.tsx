import { Link } from "@inertiajs/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";


export default function Head() {
  const [ isCardOpen, setIsCardOpen ] = useState(false);
  const [ isCurrencyOpen, setIsCurrencyOpen ] = useState(false);
  const [ isLanguageOpen, setIsLanguageOpen]  = useState(false);

  return (    
    // Top Header with social links, currently, language
    <div className="bg-gray-800 text-white py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <Link prefetch href="#" className="hover:text-gray-300">
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link prefetch href="#" className="hover:text-gray-300">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link prefetch href="#" className="hover:text-gray-300">
            <i className="fab fa-intagram"></i>
          </Link>
          <Link prefetch href="#" className="hover:text-gray-300">
            <i className="fab fa-pinterest"></i>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative" x-data="{ open: false }">
            <button
              onClick={()=>setIsCurrencyOpen(!isCurrencyOpen)}
              className="flex items-center space-x-1 hover:text-gray-300"
            >
              <span>FCFA</span>
              <i className="fas fa-chevron-down text-xs"></i>
              {/* <ChevronDown size={16} /> */}
            </button>
            {isCurrencyOpen && ( 
              <div x-show="open"
                className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-md overflow-hidden z-50"
              >
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">FCFA - FR Dollar</Link>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">USD -US Dollar</Link>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">EUR - Euro</Link>
              </div>
            )}
          </div>
          <div className="relative" x-data="{ open: false }">
            <button
              onClick={()=>setIsCurrencyOpen(!isCurrencyOpen)}
              className="flex items-center space-x-1 hover:text-gray-300"
            >
              <span>FCFA</span>
              <i className="fas fa-chevron-down text-xs"></i>
              {/* <ChevronDown size={16} /> */}
            </button>
            {isCurrencyOpen && ( 
              <div x-show="open"
                className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-md overflow-hidden z-50"
              >
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">FCFA - FR Dollar</Link>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">USD -US Dollar</Link>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">EUR - Euro</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}