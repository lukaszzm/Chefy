import type { GetServerSideProps } from "next";

import { getServerSession } from "next-auth";

import { Account } from "@/components/Settings/Account";
import { Password } from "@/components/Settings/Password";
import { Preferences } from "@/components/Settings/Preferences";
import { ContentWrapper } from "@/components/UI/ContentWrapper";
import { Subtitle } from "@/components/UI/Subtitle";
import { Title } from "@/components/UI/Title";
import type { Area, Category } from "@/interfaces";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getAllAreas, getPreferredAreas } from "@/queries/db/area";
import { getAllCategories, getPreferredCategories } from "@/queries/db/category";

interface SettingsPageProps {
  name: string;
  allAreas: Area[];
  allCategories: Category[];
  defaultAreas: Area[];
  defaultCategories: Category[];
}

const SettingsPage = ({ name, allAreas, allCategories, defaultAreas, defaultCategories }: SettingsPageProps) => {
  return (
    <ContentWrapper fullHeight fullWidth>
      <Title>Settings</Title>
      <div className="m-2 flex max-w-5xl flex-col gap-4 xl:flex-row">
        <div className="w-full">
          <div className="rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-sm">
            <Subtitle>General Info</Subtitle>
            <Account name={name} />
          </div>
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-sm">
            <Subtitle>Password</Subtitle>
            <Password />
          </div>
        </div>
        <div className="w-full">
          <div className="rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-sm">
            <Subtitle>Preferences</Subtitle>
            <Preferences
              allAreas={allAreas}
              allCategories={allCategories}
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

  const allCategories = await getAllCategories();
  const allAreas = await getAllAreas();

  const defaultCategories = await getPreferredCategories(userEmail);
  const defaultAreas = await getPreferredAreas(userEmail);

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
