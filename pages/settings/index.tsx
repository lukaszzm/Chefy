import { NextPage } from "next";
import { getServerSession, unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { Account } from "../../components/Settings/Account";
import { Preferences } from "../../components/Settings/Preferences";
import prisma from "../../lib/prisma";
import { IArea } from "../../interfaces/Area.interface";
import { ICategory } from "../../interfaces/Category.interface";
import { Title } from "../../components/UI/Title";
import { Subtitle } from "../../components/UI/Subtitle";
import { Password } from "../../components/Settings/Password";

interface ISettingsProps {
  name: string;
  allAreas: IArea[];
  allCategories: ICategory[];
  defaultAreas: IArea[];
  defaultCategories: ICategory[];
}

const Settings: NextPage<ISettingsProps> = (props) => {
  const { name, allAreas, allCategories, defaultAreas, defaultCategories } =
    props;

  return (
    <>
      <Title>Settings</Title>
      <div className="flex flex-col lg:flex-row max-w-5xl">
        <div className="w-full pr-4 border-r">
          <Subtitle className="pb-1 border-b border-b-gray-400">
            General Info
          </Subtitle>
          <Account name={name} />
          <Subtitle className="pb-1 border-b border-b-gray-400">
            Password
          </Subtitle>
          <Password />
        </div>
        <div className="w-full pl-4">
          <Subtitle className="pb-1 border-b border-b-gray-400">
            Preferences
          </Subtitle>
          <Preferences
            allCategories={allCategories}
            allAreas={allAreas}
            defaultAreas={defaultAreas}
            defaultCategories={defaultCategories}
          />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || !session.user || !session.user.email || !session.user.name) {
    return {
      redirect: {
        destination: "/",
        permament: false,
      },
    };
  }

  const userEmail = session.user.email;
  const userName = session.user.name;

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
      name: userName,
      allAreas,
      allCategories,
      defaultCategories,
      defaultAreas,
    },
  };
}

export default Settings;
