import { atom } from 'jotai'

export type ICurrentToolAtom = "line" | "dot" | "circle" | "hand" ;

export const CURRENT_TOOL_ATOM = atom<ICurrentToolAtom>("hand");