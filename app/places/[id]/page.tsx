import { notFound } from "next/navigation";
import { DEV_PLACES, getPlace } from "@/lib/data/places";
import PlaceDetail from "./place-detail";

export function generateStaticParams() {
  return DEV_PLACES.map((p) => ({ id: p.id }));
}

export default async function PlacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const place = getPlace(id);
  if (!place) notFound();
  return <PlaceDetail place={place} />;
}
