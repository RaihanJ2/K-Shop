const Footer = () => {
  return (
    <footer className="w-full py-10 dark:bg-gray-800  bg-gray-100 dark:text-gray-100 text-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <i className="fa-solid fa-dragon text-amber-500 text-3xl mr-3"></i>
              <h3 className="text-xl font-bold">K-ShopCommerce</h3>
            </div>
            <p className="mt-2 text-sm text-gray-400 dark:text-gray-600">
              Premium shopping experience since 2024
            </p>
          </div>

          <div className="flex flex-col mb-6 md:mb-0">
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <a
                href="/"
                className="text-sm hover:text-amber-400 transition-colors"
              >
                Home
              </a>
              <a
                href="/account"
                className="text-sm hover:text-amber-400 transition-colors"
              >
                My Account
              </a>
              <a
                href="/cart"
                className="text-sm hover:text-amber-400 transition-colors"
              >
                Cart
              </a>
            </div>
          </div>

          <div className="flex flex-col md:items-end">
            <h4 className="font-semibold mb-3">Connect With Us</h4>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-2xl hover:text-amber-400 hover:scale-110 transition-all duration-300"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="text-2xl hover:text-amber-400 hover:scale-110 transition-all duration-300"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="#"
                className="text-2xl hover:text-amber-400 hover:scale-110 transition-all duration-300"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 dark:border-gray-300 mt-8 pt-8 text-center text-sm text-gray-400 dark:text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} KCommerce. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
