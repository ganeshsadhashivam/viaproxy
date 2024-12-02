import Image from "next/image";
import Header from "../components/Header";

export default function Page() {
  return (
    <div>
      <Header />
      <main>
        <Image src="/welcome.jpg" width={1280} height={100} alt="welcome" />
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
