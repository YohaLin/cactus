import Welcome from "@/components/Welcome";
import Member from "@/components/Member";
import Story from "@/components/Story";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="w-full">
      <Welcome />

      <Story />

      <Member />

      <Footer />
    </div>
  );
};

export default Home;
