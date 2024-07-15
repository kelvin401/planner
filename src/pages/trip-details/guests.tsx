import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean | null;
}

async function confirmParticipant(participantId: string) {
  await api.get(`/participants/${participantId}/confirm`);
}

export function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const response = await api.get(`/trips/${tripId}/participants`);
      setParticipants(response.data.participants);
    };
    fetchParticipants();
  }, [tripId]);

  const handleConfirmParticipant = async (participantId: string) => {
    await confirmParticipant(participantId);

    const response = await api.get(`/trips/${tripId}/participants`);
    setParticipants(response.data.participants);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Convidados</h2>

      <div className="space-y-5">
        {participants.map((participant, index) => (
          <div
            key={participant.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {participant.name ?? `Convidado ${index}`}
              </span>
              <span className="font-sm block truncate text-zinc-400">
                {participant.email}
              </span>
            </div>
            {participant.is_confirmed ? (
              <CheckCircle2
                onClick={() => handleConfirmParticipant(participant.id)}
                className="size-5 shrink-0 text-green-400 hover:cursor-pointer"
              />
            ) : (
              <CircleDashed
                onClick={() => handleConfirmParticipant(participant.id)}
                className="size-5 shrink-0 text-zinc-400 hover:cursor-pointer"
              />
            )}
          </div>
        ))}
      </div>

      <Button size="full" variant="secondary">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  );
}
