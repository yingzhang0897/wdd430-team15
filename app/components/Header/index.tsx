import { auth } from '@/auth';
import { getCategories } from '@/app/lib/data';
import HeaderClient from './HeaderClient';

export default async function Header() {
  const session = await auth();
  const categories = await getCategories();

  return <HeaderClient session={session} categories={categories} />;
}
