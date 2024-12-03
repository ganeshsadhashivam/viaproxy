import Image from "next/image";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="h-dvh">
      <Header />
      {/* <Navbar /> */}
      <main className="">
        <Image
          src="/landingpagedesign.jpg"
          width={1920}
          height={1000}
          alt="landingpagedesign"
        />
        <section></section>
      </main>
      <footer>
        <div className=" bg-black text-white p-10">
          <ul>
            <li>linkedin</li>
            <li>github</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
