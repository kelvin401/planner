import { Link2, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateLinkModalProps {
  closeCreateLinkModal: () => void;
}

export function CreateLinkModal({
  closeCreateLinkModal,
}: CreateLinkModalProps) {
  const { tripId } = useParams();

  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString();
    const url = data.get("url")?.toString();

    console.log({ title, url });

    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    });

    closeCreateLinkModal();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar links</h2>
            <button type="button" onClick={closeCreateLinkModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar os links.
          </p>
        </div>

        <form onSubmit={createLink} className="space-y-3">
          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <Tag className="size-5 text-zinc-400" />
            <input
              name="title"
              placeholder="Título do link"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          </div>

          <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <Link2 className="size-5 text-zinc-400" />
            <input
              type="url"
              name="url"
              placeholder="Cole o link aqui..."
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          </div>

          <Button size="full">Salvar link</Button>
        </form>
      </div>
    </div>
  );
}
