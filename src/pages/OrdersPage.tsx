import { Package } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";

export default function OrdersPage() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-violet-50">
          <Package className="h-7 w-7 text-violet-600" />
        </div>
        <h1 className="text-xl font-bold text-slate-900">No orders yet</h1>
        <p className="mt-2 text-sm text-slate-500">Your booked decorations will appear here.</p>
        <Button variant="primary" asChild className="mt-6">
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    </Container>
  );
}
