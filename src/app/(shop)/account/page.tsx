import AccountClient from './AccountClient';

type AccountPageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function AccountPage({ searchParams }: AccountPageProps) {
  const tabParam = searchParams?.tab;
  const tab = Array.isArray(tabParam) ? tabParam[0] : tabParam;
  const initialTab = tab === 'orders' || tab === 'profile' || tab === 'security' ? tab : undefined;

  return <AccountClient initialTab={initialTab} />;
}
