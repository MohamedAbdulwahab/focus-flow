const Footer = () => {
  return (
    <footer className='pt-8 pb-6 bottom-0 mt-auto'>
      <div className='container mx-auto px-4'>
        <hr className='my-6' />
        <div className='flex flex-wrap items-center md:justify-between justify-center'>
          <div className='w-full md:w-4/12 px-4 mx-auto text-center'>
            <div className='text-sm py-1'>
              <a
                href='https://www.mohamedev.com'
                className=' text-indigo-500 hover:text-indigo-700'
              >
                Mohamed Abdulwahab
              </a>{' '}
              © 2023
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
