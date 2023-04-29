import { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { prisma } from "@/lib/prisma";
import type { Area, Category } from "@/interfaces";
import { Title } from "@/components/ui/Title";
import { Subtitle } from "@/components/ui/Subtitle";
import { Account } from "@/components/Settings/Account";
import { Password } from "@/components/Settings/Password";
import { Preferences } from "@/components/Settings/Preferences";
import { ContentWrapper } from "@/components/ui/ContentWrapper";

interface ISettingsPageProps {
  name: string;
  allAreas: Area[];
  allCategories: Category[];
  defaultAreas: Area[];
  defaultCategories: Category[];
}

const SettingsPage: NextPage<ISettingsPageProps> = ({
  name,
  allAreas,
  allCategories,
  defaultAreas,
  defaultCategories,
}) => {
  return (
    <ContentWrapper fullWidth fullHeight>
      <Title>Settings</Title>
      <div className="flex flex-col gap-4 m-2 xl:flex-row max-w-5xl">
        <div className="w-full">
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm border border-gray-200">
            <Subtitle>General Info</Subtitle>
            <Account name={name} />
          </div>
          <div className="p-4 mt-4 bg-gray-100 rounded-lg shadow-sm border border-gray-200">
            <Subtitle>Password</Subtitle>
            <Password />
          </div>
        </div>
        <div className="w-full">
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm border border-gray-200">
            <Subtitle>Preferences</Subtitle>
            <Preferences
              allCategories={allCategories}
              allAreas={allAreas}
              defaultAreas={defaultAreas}
              defaultCategories={defaultCategories}
            />
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permament: false,
      },
      props: {},
    };
  }

  const userEmail = session.user.email;
  const allCategories = await prisma.category.findMany();
  const allAreas = await prisma.area.findMany();

  const defaultCategories = await prisma.category.findMany({
    where: {
      User: {
        some: {
          email: userEmail,
        },
      },
    },
  });

  const defaultAreas = await prisma.area.findMany({
    where: {
      User: {
        some: {
          email: userEmail,
        },
      },
    },
  });

  return {
    props: {
      name: session.user.name,
      allAreas,
      allCategories,
      defaultCategories,
      defaultAreas,
    },
  };
};

export default SettingsPage;
