// app/product/[id]/review/page.tsx
import { auth } from "@/auth";
import ReviewClientPage from "./ReviewClientPage";

export default async function ReviewPage({params}: {params: {id: string}}) {
  const productId = params.id;
  const session = await auth(); // Ensure user is authenticated
  console.log("Session:", session);

  const product = await fetch(
    `http://localhost:3000/api/products/${productId}`
  ).then((response) => {
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
    return response.json();
  });

  return <ReviewClientPage product={product} />;
}
