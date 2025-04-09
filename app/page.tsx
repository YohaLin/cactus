import Welcome from "@/components/Welcome";
import Member from "@/components/Member";
import Story from "@/components/Story";

const Home = () => {
  return (
    <div className="w-full">
      <Welcome />

      <Story />

      <Member />
    </div>
  );
};

export default Home;
