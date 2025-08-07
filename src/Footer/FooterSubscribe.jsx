export default function FooterSubscribe({
    wrapperClass = "",
    textClass = "",
    buttonClass = ""
  }) {
    return (
      <div className={`flex flex-col md:flex-row items-center justify-center bg-gray-100 mx-auto p-10 mt-20 space-y-4 md:space-y-0 md:space-x-6 ${wrapperClass}`}>
        <p className={`text-center md:text-left text-gray-700 flex-1 text-sm md:text-base max-w-4xl ${textClass}`}>
          Subscribe and be the first to receive information about the start of sales, discounts, promotions, bonuses and welcome surprises at Rozetka!
        </p>
        <button className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-5 rounded transition-colors duration-300 ${buttonClass}`}>
          Subscribe
        </button>
      </div>
    );
  }