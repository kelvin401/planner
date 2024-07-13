import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";

export function ImportantLinks() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links importantes</h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Reservado do AirBnB
            </span>
            <a
              href=""
              className="font-xs block truncate text-zinc-400 hover:text-zinc-200"
            >
              https://www.airbnb.com/rooms/10430890485038503845723869598
            </a>
          </div>
          <Link2 className="size-5 shrink-0 text-zinc-400" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Reservado do AirBnB
            </span>
            <a
              href=""
              className="font-xs block truncate text-zinc-400 hover:text-zinc-200"
            >
              https://www.airbnb.com/rooms/10430890485038503845723869598
            </a>
          </div>
          <Link2 className="size-5 shrink-0 text-zinc-400" />
        </div>
      </div>

      <Button size="full" variant="secondary">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
