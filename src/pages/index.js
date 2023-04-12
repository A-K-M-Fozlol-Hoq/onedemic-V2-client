//external imports
import Head from "next/head";

//internal imports
import LandingPage from "@/components/home/LandingPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Onedemic</title>
        <meta
          name="description"
          content="Onedemic - an online examination platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LandingPage></LandingPage>
      </main>
    </>
  );
}
