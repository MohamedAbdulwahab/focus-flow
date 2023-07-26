import SignIn from '../components/SignIn';

const HomePage = () => {
  return (
    <>
      <main className='flex flex-col justify-center items-center mx-auto mt-14 px-4 bg-slate-100'>
        {/* text  */}
        <section className='flex justify-center items-center'>
          <h1 className='text-4xl md:text-6xl font-bold tracking-tight text-gray-900'>
            Welcome to
          </h1>
          <h1 className='text-4xl md:text-6xl font-bold tracking-tight text-indigo-600 ml-3'>
            Focus Flow
          </h1>
        </section>

        {/* sign-in form  */}
        <section className='w-full flex justify-center items-center mt-5'>
          <SignIn />
        </section>
      </main>
    </>
  );
};

export default HomePage;
