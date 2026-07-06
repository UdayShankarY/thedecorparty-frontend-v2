import { PackageSearch } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";

export function ProductNotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-violet-50">
          <PackageSearch className="h-10 w-10 text-violet-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Product not found</h1>
        <p className="mt-3 max-w-md text-sm text-slate-500">
          This decoration package may have been removed or the link is incorrect.
        </p>
        <Button variant="primary" asChild className="mt-8">
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    </Container>
  );
}
