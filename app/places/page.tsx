import { Suspense } from "react";
import { Loading } from "@/components/ui";
import PlacesView from "./places-view";

export default function PlacesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PlacesView />
    </Suspense>
  );
}
