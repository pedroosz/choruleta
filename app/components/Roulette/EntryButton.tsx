interface Props {
  children: React.ReactNode;
}

export default function EntryButton({ children }: Props) {
  return (
    <div className="flex flex-col w-full rounded-md uppercase font-bold justify-center items-center bg-neutral-800 p-2 lg:flex-row lg:justify-between ">
      {children}
    </div>
  );
}
