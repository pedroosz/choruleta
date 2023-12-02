interface Props {
  children: React.ReactNode;
}

export default function PageContainer({ children }: Props) {
  return (
    <div className="pt-14 px-4 pb-4">
      <div className="max-w-5xl mx-auto w-full items-center justify-between">
        {children}
      </div>
    </div>
  );
}
