
export default function AdBanner() {
  return (
    <div className=" flex flex-col items-center gap-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-md">
      <div className="text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Advertisement</p>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg min-h-[250px] flex items-center justify-center">
          <img src="https://judicialesvalledupar.com/wp-content/uploads/2022/03/WhatsApp-Image-2022-03-07-at-9.00.05-AM-768x994.jpeg" alt="publicidad" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Advertisement</p>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg min-h-[100px] flex items-center justify-center">
          <img src="https://judicialesvalledupar.com/wp-content/uploads/2023/07/comfacesar-768x259.jpeg" alt="publicidad" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}