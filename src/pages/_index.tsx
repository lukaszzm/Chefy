import type { GetServerSideProps } from "next";

import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

import { Home } from "@/components/Home";
import { LoadingScreen } from "@/components/UI/LoadingScreen";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const HomePage = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") return <LoadingScreen />;

  if (status === "authenticated") router.replace("/explore");

  return <Home />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/explore",
        permament: false,
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

export default HomePage;
