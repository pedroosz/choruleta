export default function formatNumber(number: number) {
  return Intl.NumberFormat("pt-BR", {
    notation: "compact",
    style: "decimal",
    maximumFractionDigits: 2,
  }).format(number);
}
