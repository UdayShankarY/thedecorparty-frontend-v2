import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";

export default function CartPage() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-violet-50">
          <ShoppingBag className="h-7 w-7 text-violet-600" />
        </div>
        <h1 className="text-xl font-bold text-slate-900">Your cart is empty</h1>
        <p className="mt-2 text-sm text-slate-500">Browse decorations and add a package to get started.</p>
        <Button variant="primary" asChild className="mt-6">
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    </Container>
  );
}
