import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

interface DestinationAndDateStepProps {
  isGuestsIpuntOpen: boolean;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  eventStartAndEndDates: DateRange | undefined;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}

interface Cities {
  id: number;
  nome: string;
}

export function DestinationAndDateStep({
  isGuestsIpuntOpen,
  closeGuestsInput,
  openGuestsInput,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [cities, setCities] = useState<Cities[]>([]);

  useEffect(() => {
    const getCities = async () => {
      const response = fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados/35/distritos?orderBy=nome",
      );
      const data = await (await response).json();
      setCities(data);
    };
    getCities();
  }, []);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function cloeseDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
      : null;

  return (
    <div className="flex flex-col">
      <div className="flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
        <div className="flex flex-1 items-center gap-2">
          <MapPin className="size-5 text-zinc-400" />
          <select
            name="city"
            id="city"
            className="w-40 flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            disabled={isGuestsIpuntOpen}
            onChange={(event) => setDestination(event.target.value)}
            required
          >
            <option value="">Para onde você vai?</option>
            {cities.map((city) => {
              return (
                <option key={city.id} value={city.nome}>
                  {city.nome}
                </option>
              );
            })}
          </select>
        </div>
        <button
          onClick={openDatePicker}
          disabled={isGuestsIpuntOpen}
          className="flex w-[240px] items-center gap-2 text-left outline-none"
        >
          <Calendar className="size-5 text-zinc-400" />
          <span className="w-40 flex-1 bg-transparent text-lg placeholder-zinc-400">
            {displayedDate || "Quando?"}
          </span>
        </button>
        {isDatePickerOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60">
            <div className="space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Selecione a data</h2>
                  <button type="button" onClick={cloeseDatePicker}>
                    <X className="size-5 text-zinc-400" />
                  </button>
                </div>
              </div>

              <DayPicker
                mode="range"
                selected={eventStartAndEndDates}
                onSelect={setEventStartAndEndDates}
              />
            </div>
          </div>
        )}
        <div className="h-6 w-px bg-zinc-800"></div>
        {isGuestsIpuntOpen ? (
          <Button variant="secondary" onClick={closeGuestsInput}>
            Alterar local/data
            <Settings2 className="size-5" />
          </Button>
        ) : (
          <Button onClick={openGuestsInput}>
            Continuar
            <ArrowRight className="size-5" />
          </Button>
        )}
      </div>
      <div></div>
    </div>
  );
}
