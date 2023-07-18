const Switcher = ({ toggler }) => {
  return (
    <div className='flex'>
      <label className='relative inline-flex items-center cursor-pointer'>
        <input
          disabled
          type='checkbox'
          checked={toggler}
          onChange={() => toggler}
          className='sr-only peer'
        />
        <div className="w-11 h-6 bg-slate-100 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-indigo-700 peer-checked:after:bg-indigo-700 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-100"></div>
      </label>
    </div>
  );
};

export default Switcher;
