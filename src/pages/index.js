import Head from 'next/head'
import { toast } from 'react-toastify';

export default function Home() {
  const notify = () => {
    toast('Tweet URL coppied.', {
      autoClose: 2500,
      type: 'error'//success, error, warning
  });
  };
  return (
    <>
      <Head>
        <title>Onedemic</title>
        <meta name="description" content="Onedemic - an online examination platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <button className='btn btn-primary' onClick={notify}>hello</button>
      </main>
    </>
  )
}
