export function PlaceholderPage({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-2xl tracking-tight">{title}</h1>
      <p className="text-muted mt-2 text-sm">{message}</p>
    </div>
  );
}
