import formatNumber from "@/app/utils/formatNumber";
import Image from "next/image";
import { match } from "ts-pattern";

export enum EntryColor {
  Red = "#B91C1C",
  Green = "#1CB91C",
  Black = "#262626",
}

type Entry = {
  avatarUrl: string;
  username: string;
  coins: number;
};

interface Props {
  title: string;
  entries?: Entry[];
  color: EntryColor;
}

export default function EntryList({ entries, title, color }: Props) {
  const iconColor = match(color)
    .with(EntryColor.Red, () => "bg-red-700")
    .with(EntryColor.Green, () => "bg-green-700")
    .with(EntryColor.Black, () => "bg-neutral-800")
    .exhaustive();

  const totalAccumulated =
    entries?.reduce((acc, entry) => acc + entry.coins, 0) || 0;

  return (
    <div className="flex flex-col rounded-md bg-black/50 border border-black">
      <header className="flex items-center p-2 gap-2 justify-between border border-transparent border-b-black">
        <div className="flex gap-2 items-center">
          <span
            className={["w-6 h-6 rounded-full", iconColor].join(" ").trimEnd()}
          />

          {entries && (
            <p className="text-xs text-neutral-500">
              {match(entries.length)
                .when(
                  (n) => n > 1,
                  (val) => `${val} apostas`
                )
                .when(
                  (n) => n === 1,
                  (val) => `${val} aposta`
                )
                .when(
                  (n) => n === 0,
                  () => "Nenhuma aposta"
                )
                .otherwise(() => "Apostas")}
            </p>
          )}
        </div>

        <p className="text-xs text-neutral-500">
          {formatNumber(totalAccumulated)} coins
        </p>
      </header>

      <ul className="flex flex-col p-2 gap-2">
        {entries && entries.length > 0 ? (
          entries.map((entry) => (
            <li key={entry.username}>
              <div className="flex items-center gap-2">
                <Image
                  src={entry.avatarUrl}
                  alt={entry.username}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-bold">{entry.username}</span>
                  <span className="text-xs text-gray-500">
                    {formatNumber(entry.coins)} coins
                  </span>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-sm text-neutral-600">Nenhuma aposta</p>
        )}
      </ul>
    </div>
  );
}
