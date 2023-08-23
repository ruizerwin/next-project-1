import Head from "next/head";
import Header from "@/app/components/Header";
import Main from "@/app/components/Main";
import Footer from "@/app/components/Footer";

export default function Home() {
    return (
        <div className="text-white">
            <Head>
                <title>nine4</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}
