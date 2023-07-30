import SignIn from '../components/SignIn';

const HomePage = () => {
  return (
    <>
      <main className='flex flex-col justify-center items-center mx-auto mt-14 px-4 bg-slate-100'>
        {/* text  */}
        <section className='flex justify-center items-center'>
          <h1 className='text-3xl md:text-6xl font-bold tracking-tight text-gray-700'>
            Welcome to{' '}
            <p className='inline tracking-tight text-indigo-700'>Focus </p>
            <p className='inline text-indigo-600'>Flow</p>
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
