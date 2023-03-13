import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { LoadingScreen } from "../components/UI/LoadingScreen";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { Home } from "../components/Home/Home";

const MainPage = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") return <LoadingScreen />;

  if (status === "authenticated") router.replace("/explore");

  if (status === "unauthenticated") return <Home />;
};

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/explore",
        permament: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default MainPage;
