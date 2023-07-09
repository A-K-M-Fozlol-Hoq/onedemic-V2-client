//external imports
import Head from "next/head";

//internal imports
import LandingPage from "@/components/home/LandingPage";
import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import { useSelector } from "react-redux";

export default function Home() {
  const { name, email, role, profile, status } = useSelector(
    (state) => state.auth
  );
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
      <Navbar name={name} role={role} email={email} />
      <main className="grow">
        <LandingPage></LandingPage>
      </main>
      <Footer />
    </div>
  );
}
