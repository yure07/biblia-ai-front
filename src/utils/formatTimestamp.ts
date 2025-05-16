import type { Timestamp } from "firebase/firestore";

export const formatTimestampToDate = (timestamp: Timestamp): string => {
  const date = timestamp.toDate()
  return date.toLocaleDateString("pt-BR");
}