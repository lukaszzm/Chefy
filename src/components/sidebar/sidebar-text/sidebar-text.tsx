interface SidebarTextProps {
  icon: React.ReactNode;
  label: string;
}

export const SidebarText = ({ icon, label }: SidebarTextProps) => {
  return (
    <>
      {icon}
      <span className="sr-only lg:not-sr-only">{label}</span>
    </>
  );
};
