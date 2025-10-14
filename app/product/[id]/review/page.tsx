import ReviewClientPage from "./ReviewClientPage";

interface Props {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
  const res = await fetch(`${process.env.API_URL}/api/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function Page({ params }: Props) {
  const { id } = await params;  // <-- await here
  const product = await getProduct(id);

  return <ReviewClientPage product={product} />;
}
