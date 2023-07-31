//external imports
import Head from "next/head";

//internal imports
import LandingPage from "@/components/home/LandingPage";
import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";

export default function Home() {
  return (
    <div className="h-screen">
      <Head>
        <title>Onedemic</title>
        <meta
          name="description"
          content="Onedemic - an online examination platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="grow">
        <LandingPage></LandingPage>
      </main>
      <Footer />
    </div>
  );
}
